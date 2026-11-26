import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import App from './App'
import { restorePrefs } from '@/lib/a11y'
import { watchSystemTheme } from '@/lib/theme'

const Privacy = lazy(() => import('@/components/Privacy'))
const ToS = lazy(() => import('@/components/ToS'))
const ThankYou = lazy(() => import('@/components/ThankYou'))
const NotFound = lazy(() => import('@/components/NotFound'))
import './styles/tokens.css'
import './styles/global.css'
import './styles/theme-glyph.css'
import './styles/contact-grid.css'
import './styles/a11y.css'
import './styles/apple.css'
import './styles/portfolio.css'
import './styles/contributions.css'

restorePrefs()
watchSystemTheme()

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root not found')

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {['projects', 'services', 'about', 'contact'].map((id) => (
          <Route key={id} path={`/${id}`} element={<Navigate to={`/#${id}`} replace />} />
        ))}
        <Route path="/testimonials" element={<Navigate to="/" replace />} />
        {/* Standalone legal and confirmation pages. */}
        <Route path="/privacy" element={<Suspense fallback={null}><Privacy /></Suspense>} />
        <Route path="/terms" element={<Suspense fallback={null}><ToS /></Suspense>} />
        <Route path="/thank-you" element={<Suspense fallback={null}><ThankYou /></Suspense>} />
        <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
