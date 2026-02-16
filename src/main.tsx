import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './ErrorBoundary.tsx'
import { AdminProvider } from './hooks/useAdmin'
import { initSentry } from './lib/sentry'

// Initialize error tracking
initSentry()

// Log admin mode instructions
console.log('%c🔓 ADMIN MODE', 'color: red; font-size: 20px; font-weight: bold;');
console.log('%cTo unlock all features:', 'color: #666;');
console.log('  1. Konami code: ↑↑↓↓←→←→BA');
console.log('  2. Or press F9');
console.log('  3. Or add ?admin to URL');

const rootElement = document.getElementById('root')

if (!rootElement) {
    console.error('Root element not found!')
} else {
    try {
        createRoot(rootElement).render(
            <StrictMode>
                <ErrorBoundary>
                    <AdminProvider>
                        <App />
                    </AdminProvider>
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
