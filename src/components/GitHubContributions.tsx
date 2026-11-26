import { memo, useState } from 'react'
import { ArrowUpRight } from '@/components/slab'
import snapshot from '@/data/github-contributions.json'

type Day = [date: string, count: number, level: number]
type Calendar = { year: number; total: number; days: Day[] }

const profileUrl = 'https://github.com/cmndrpaul'
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' })

const ContributionGrid = memo(function ContributionGrid({ calendar }: { calendar: Calendar }) {
  const { year, days } = calendar
  const start = Date.UTC(year, 0, 1)
  const yearLength = (Date.UTC(year + 1, 0, 1) - start) / 86400000
  const offset = new Date(start).getUTCDay()
  const weeks = Math.ceil((yearLength + offset) / 7)

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
        {Array.from({ length: yearLength }, (_, index) => {
          const [date, count, level] = days[index] ?? []
          const slot = offset + index
          return (
            <span key={index} className="contributions__day" data-level={level}
              style={{ gridColumn: 2 + Math.floor(slot / 7), gridRow: 2 + slot % 7 }}
              title={date ? `${count} ${count === 1 ? 'contribution' : 'contributions'} on ${dateFormatter.format(new Date(date))}` : undefined}
              aria-hidden="true" />
          )
        })}
      </div>
    </div>
  )
})

export default function GitHubContributions() {
  const calendars = snapshot.calendars as Calendar[]
  const [year, setYear] = useState(calendars[0].year)
  const calendar = calendars.find((entry) => entry.year === year) ?? calendars[0]

  return (
    <section className="contributions" aria-labelledby="contributions-title">
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
            {calendars.map((entry) => (
              <button type="button" key={entry.year} aria-pressed={entry.year === calendar.year} onClick={() => setYear(entry.year)}>{entry.year}</button>
            ))}
          </div>
          <a href={profileUrl} target="_blank" rel="noopener noreferrer">View profile <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </header>
      <ContributionGrid calendar={calendar} />
      <div className="contributions__legend" aria-label="Color intensity increases with activity">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => <span className="contributions__day" data-level={level} key={level} aria-hidden="true" />)}
        <span>More</span>
      </div>
    </section>
  )
}
