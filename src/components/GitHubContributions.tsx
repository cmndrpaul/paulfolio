import { memo, useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from '@/components/slab'
import snapshot from '@/data/github-contributions.json'

type Day = [date: string, count: number, level: number]
type Calendar = { year: number; total: number; days: Day[] }
type Snapshot = { asOf: string; calendars: Calendar[] }

const profileUrl = 'https://github.com/cmndrpaul'
const snapshotUrl = 'https://raw.githubusercontent.com/cmndrpaul/paulfolio/main/src/data/github-contributions.json'
const cacheKey = 'paulfolio:contributions:v1'
const cacheDuration = 6 * 60 * 60 * 1000
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
let dateFormatter: Intl.DateTimeFormat | undefined

function isSnapshot(value: unknown): value is Snapshot {
  if (!value || typeof value !== 'object') return false
  const { asOf, calendars } = value as Partial<Snapshot>
  return typeof asOf === 'string' && Number.isFinite(Date.parse(asOf)) && asOf >= snapshot.asOf
    && Array.isArray(calendars) && calendars.length > 0
    && calendars.every((calendar) =>
      Number.isInteger(calendar?.year) && calendar.year >= 1970 && calendar.year <= 9999
      && Number.isFinite(calendar.total) && Array.isArray(calendar.days) && calendar.days.length <= 366
      && calendar.days.every((day) => Array.isArray(day)
        && typeof day[0] === 'string' && Number.isFinite(Date.parse(day[0]))
        && Number.isInteger(day[1]) && Number.isInteger(day[2])))
}

const ContributionGrid = memo(function ContributionGrid({ calendar, ready }: { calendar: Calendar; ready: boolean }) {
  const { year, days } = calendar
  const start = Date.UTC(year, 0, 1)
  const yearLength = (Date.UTC(year + 1, 0, 1) - start) / 86400000
  const offset = new Date(start).getUTCDay()
  const weeks = Math.ceil((yearLength + offset) / 7)
  const formatter = ready ? dateFormatter ??= new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' }) : undefined

  return (
    <div className="contributions__scroll" tabIndex={0} role="region" aria-label={`Daily contributions in ${year}`}>
      <div className="contributions__grid" style={{ gridTemplateColumns: `28px repeat(${weeks}, minmax(9px, 1fr))` }}>
        {months.map((month, index) => {
          const dayIndex = (Date.UTC(year, index, 1) - start) / 86400000
          return <span className="contributions__label" key={month} style={{ gridColumn: 2 + Math.floor((offset + dayIndex) / 7), gridRow: 1 }}>{month}</span>
        })}
        {['Mon', 'Wed', 'Fri'].map((weekday, index) => (
          <span className="contributions__label" key={weekday} style={{ gridColumn: 1, gridRow: 3 + 2 * index }}>{weekday}</span>
        ))}
        {!formatter && Array.from({ length: 7 }, (_, index) => (
          <span key={index} className="contributions__day" style={{ gridColumn: 2, gridRow: 2 + index, visibility: 'hidden' }} aria-hidden="true" />
        ))}
        {formatter && Array.from({ length: yearLength }, (_, index) => {
          const [date, count, level] = days[index] ?? []
          const slot = offset + index
          return (
            <span key={index} className="contributions__day" data-level={level}
              style={{ gridColumn: 2 + Math.floor(slot / 7), gridRow: 2 + slot % 7 }}
              title={date ? `${count} ${count === 1 ? 'contribution' : 'contributions'} on ${formatter.format(new Date(date))}` : undefined}
              aria-hidden="true" />
          )
        })}
      </div>
    </div>
  )
})

export default function GitHubContributions() {
  const section = useRef<HTMLElement>(null)
  const [data, setData] = useState(snapshot as Snapshot)
  const [year, setYear] = useState<number | null>(null)
  const [gridReady, setGridReady] = useState(false)
  const calendar = data.calendars.find((entry) => entry.year === year) ?? data.calendars[0]

  useEffect(() => {
    const node = section.current
    if (!node) return

    const controller = new AbortController()
    let refreshTimer: number | undefined
    let gridFrame = 0
    async function refresh() {
      let cached: Snapshot | undefined
      try {
        const entry = JSON.parse(localStorage.getItem(cacheKey) ?? 'null')
        const stored: unknown = entry?.data
        if (isSnapshot(stored)) {
          cached = stored
          setData(stored)
          if (typeof entry.fetchedAt === 'number') {
            const age = Date.now() - entry.fetchedAt
            if (age >= 0 && age < cacheDuration) return
          }
        }
      } catch { /* Storage is optional. */ }

      try {
        const response = await fetch(snapshotUrl, { signal: controller.signal })
        if (!response.ok) return
        const latest: unknown = await response.json()
        if (controller.signal.aborted || !isSnapshot(latest) || (cached && latest.asOf < cached.asOf)) return
        setData(latest)
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ data: latest, fetchedAt: Date.now() }))
        } catch { /* Fresh data remains usable without storage. */ }
      } catch { /* Keep the bundled or cached snapshot if refresh fails. */ }
    }
    function scheduleRefresh() {
      refreshTimer = window.setTimeout(() => void refresh(), 1500)
    }
    const observer = new IntersectionObserver((entries) => {
      for (const { isIntersecting, target } of entries) {
        if (!isIntersecting) continue
        observer.unobserve(target)
        if (target === node) {
          if (document.readyState === 'complete') scheduleRefresh()
          else window.addEventListener('load', scheduleRefresh, { once: true })
        } else {
          gridFrame = requestAnimationFrame(() => {
            gridFrame = requestAnimationFrame(() => setGridReady(true))
          })
        }
      }
    })
    observer.observe(node)
    const grid = node.querySelector('.contributions__scroll')
    if (grid) observer.observe(grid)
    return () => {
      observer.disconnect()
      window.removeEventListener('load', scheduleRefresh)
      cancelAnimationFrame(gridFrame)
      window.clearTimeout(refreshTimer)
      controller.abort()
    }
  }, [])

  return (
    <section className="contributions" aria-labelledby="contributions-title" ref={section} onFocus={() => setGridReady(true)}>
      <header className="contributions__header">
        <div className="contributions__summary">
          <img className="contributions__logo" src="/icons/github.svg" width="24" height="24" alt="" />
          <div>
            <h2 id="contributions-title">GitHub contributions</h2>
            <p aria-live="polite">{calendar.total.toLocaleString('en-US')} {calendar.total === 1 ? 'contribution' : 'contributions'} in {calendar.year}</p>
          </div>
        </div>
        <div className="contributions__controls">
          <div className="contributions__years" role="group" aria-label="Contribution year">
            {data.calendars.map((entry) => (
              <button type="button" key={entry.year} aria-pressed={entry.year === calendar.year} onClick={() => setYear(entry.year)}>{entry.year}</button>
            ))}
          </div>
          <a href={profileUrl} target="_blank" rel="noopener noreferrer">View profile <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </header>
      <ContributionGrid calendar={calendar} ready={gridReady} />
      <div className="contributions__legend" aria-label="Color intensity increases with activity">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => <span className="contributions__day" data-level={level} key={level} aria-hidden="true" />)}
        <span>More</span>
      </div>
    </section>
  )
}
