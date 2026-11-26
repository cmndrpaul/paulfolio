import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { restorePrefs } from '@/lib/a11y'
import { watchSystemTheme } from '@/lib/theme'

import './styles/tokens.css'
import './styles/global.css'
import './styles/theme-glyph.css'
import './styles/contact-grid.css'
import './styles/a11y.css'
import './styles/apple.css'
import './styles/portfolio.css'
import './styles/contributions.css'

const StandaloneRoutes = lazy(() => import('./StandaloneRoutes'))
const pathname = window.location.pathname.replace(/\/+$/, '').toLowerCase()
const section = /^\/(projects|services|about|contact)$/.exec(pathname)?.[1]
const isHome = !pathname || !!section || pathname === '/testimonials'

if (section || pathname === '/testimonials') {
  window.history.replaceState(window.history.state, '', section ? `/#${section}` : '/')
}

restorePrefs()
watchSystemTheme()

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root not found')

createRoot(container).render(
  <StrictMode>
    {isHome ? <App /> : <Suspense fallback={null}><StandaloneRoutes /></Suspense>}
  </StrictMode>,
)
