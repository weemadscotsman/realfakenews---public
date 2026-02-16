import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './ErrorBoundary.tsx'
import { initSentry } from './lib/sentry'

// Initialize error tracking
initSentry()

const rootElement = document.getElementById('root')

if (!rootElement) {
    console.error('Root element not found!')
} else {
    try {
        createRoot(rootElement).render(
            <StrictMode>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </StrictMode>,
        )
    } catch (error) {
        console.error('Failed to mount React app:', error)
        rootElement.innerHTML = `
            <div style="padding: 40px; font-family: sans-serif;">
                <h1 style="color: #ef4444;">Failed to load RealFake News</h1>
                <p style="color: #666;">
                    ${error instanceof Error ? error.message : 'Unknown error'}
                </p>
            </div>
        `
    }
}
