/**
 * Two themes on one set of tokens. `data-theme` on <html> is the single
 * switch: tokens.css redefines the brand vars under [data-theme='dark'], so
 * every existing rule keeps reading --cream / --navy / --white and inverts
 * with it instead of being rewritten.
 *
 * index.html applies the initial preference before first paint.
 */
export type Theme = 'light' | 'dark'

const KEY = 'theme'
let hasManualTheme = false

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function updateTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  window.dispatchEvent(new CustomEvent<Theme>('themechange', { detail: theme }))
}

export function watchSystemTheme() {
  const preference = window.matchMedia('(prefers-color-scheme: dark)')
  const update = () => {
    if (hasManualTheme) return
    try {
      const saved = localStorage.getItem(KEY)
      if (saved === 'light' || saved === 'dark') return
    } catch {
      /* The system preference is still available when storage is blocked. */
    }
    updateTheme(preference.matches ? 'dark' : 'light')
  }
  update()
  preference.addEventListener('change', update)
}

function applyTheme(theme: Theme) {
  hasManualTheme = true
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* private mode: the theme just does not persist */
  }
  updateTheme(theme)
}

export type SweepOrigin = { x: number; y: number }

type WithViewTransition = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> }
}

/**
 * Switch themes as a hard-edged circle growing out of the control that
 * asked for it: inside the circle is entirely the new palette, outside is
 * the old one, until the edge clears the farthest corner. View Transitions
 * API; the origin and the required radius go to global.css as custom
 * properties. The API animates between captures of the page, so what sits
 * outside the circle holds still for the 1.2s - a crisp edge instead of
 * a live wave. Mobile layouts switch instantly to keep the sticky
 * header in the live page while the browser chrome is visible.
 */
export function setTheme(theme: Theme, origin?: SweepOrigin) {
  const doc = document as WithViewTransition
  const root = document.documentElement
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobileLayout = window.matchMedia('(max-width: 800px)').matches
  if (!doc.startViewTransition || mobileLayout || reduce || getTheme() === theme) {
    applyTheme(theme)
    return
  }
  const x = origin?.x ?? window.innerWidth / 2
  const y = origin?.y ?? window.innerHeight / 2
  const r = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )
  root.style.setProperty('--sweep-x', `${x}px`)
  root.style.setProperty('--sweep-y', `${y}px`)
  root.style.setProperty('--sweep-r', `${r}px`)
  root.dataset.themeSweep = 'on'
  doc
    .startViewTransition(() => applyTheme(theme))
    .finished.finally(() => {
      delete root.dataset.themeSweep
    })
}

/** Pass the toggle's own element so the sweep starts under the cursor. */
export function toggleTheme(from?: Element | null): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
  const r = from?.getBoundingClientRect()
  setTheme(next, r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : undefined)
  return next
}
