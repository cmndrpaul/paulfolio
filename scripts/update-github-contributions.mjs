import { writeFile } from 'node:fs/promises'

const login = 'cmndrpaul'
const today = process.env.CONTRIBUTIONS_AS_OF ?? new Date().toISOString().slice(0, 10)
const currentYear = Number(today.slice(0, 4))
const years = Array.from({ length: 4 }, (_, index) => currentYear - index)
const output = new URL('../src/data/github-contributions.json', import.meta.url)
const token = process.env.CONTRIBUTIONS_TOKEN

async function readPublicCalendar(year) {
  const from = `${year}-01-01`
  const to = year === currentYear ? today : `${year}-12-31`
  const url = new URL(`https://github.com/users/${login}/contributions`)
  url.search = new URLSearchParams({ from, to })
  const response = await fetch(url, { headers: { 'Accept-Language': 'en' }, signal: AbortSignal.timeout(15000) })
  if (!response.ok) throw new Error(`Public calendar for ${year} returned HTTP ${response.status}`)

  const markup = await response.text()
  const counts = new Map()
  for (const match of markup.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>\s*(No|[\d,]+) contributions? on\b[^<]*<\/tool-tip>/g)) {
    counts.set(match[1], match[2] === 'No' ? 0 : Number(match[2].replaceAll(',', '')))
  }

  const days = []
  for (const match of markup.matchAll(/<td\b[^>]*\bdata-date="([^"]+)"[^>]*>/g)) {
    const date = match[1]
    if (date < from || date > to) continue
    const id = match[0].match(/\bid="([^"]+)"/)?.[1]
    const level = Number(match[0].match(/\bdata-level="([0-4])"/)?.[1])
    const count = counts.get(id)
    if (!Number.isInteger(level) || !Number.isSafeInteger(count)) {
      throw new Error(`Missing public activity count or level for ${date}`)
    }
    days.push([date, count, level])
  }

  days.sort(([a], [b]) => a.localeCompare(b))
  const expectedDays = (Date.parse(to) - Date.parse(from)) / 86400000 + 1
  if (days.length !== expectedDays || new Set(days.map(([date]) => date)).size !== expectedDays) {
    throw new Error(`Incomplete public calendar for ${year}: ${days.length} of ${expectedDays} days`)
  }
  return { year, total: days.reduce((sum, [, count]) => sum + count, 0), days }
}

async function compareGraphQL({ year, days }) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(15000),
    body: JSON.stringify({
      query: `query Calendar($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar { weeks { contributionDays { date contributionCount } } }
          }
        }
      }`,
      variables: {
        login,
        from: `${year}-01-01T00:00:00Z`,
        to: `${days.at(-1)[0]}T23:59:59Z`,
      },
    }),
  })
  if (!response.ok) throw new Error(`GraphQL returned HTTP ${response.status}`)
  const { data, errors } = await response.json()
  const calendar = data?.user?.contributionsCollection?.contributionCalendar
  if (errors?.length || !calendar) throw new Error('GraphQL calendar unavailable')
  const counts = new Map(calendar.weeks.flatMap(({ contributionDays }) =>
    contributionDays.map(({ date, contributionCount }) => [date, contributionCount])))
  const mismatches = days.filter(([date, count]) => counts.get(date) !== count).length
  if (mismatches) console.warn(`GraphQL differed from the public calendar on ${mismatches} days in ${year}; using public counts.`)
  else console.log(`GraphQL matches the public calendar for ${year}.`)
}

const calendars = await Promise.all(years.map(readPublicCalendar))
if (token) {
  for (const calendar of calendars) {
    try {
      await compareGraphQL(calendar)
    } catch (error) {
      console.warn(`Could not compare GraphQL for ${calendar.year}: ${error.message}; using public counts.`)
    }
  }
}
await writeFile(output, JSON.stringify({ asOf: today, calendars }) + '\n')
for (const { year, total } of calendars) console.log(`${year}: ${total} public profile contributions`)
