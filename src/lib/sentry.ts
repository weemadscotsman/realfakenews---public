import * as Sentry from '@sentry/react';

/**
 * Initialize Sentry for error tracking
 */
export function initSentry() {
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    
    if (!dsn || dsn === 'placeholder-dsn') {
        console.log('[Sentry] DSN not configured, error tracking disabled');
        return;
    }

    Sentry.init({
        dsn,
        environment: import.meta.env.MODE || 'development',
        
        // Performance monitoring
        tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
        
        // Session replay for debugging user issues
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        
        // Before sending, sanitize sensitive data
        beforeSend(event) {
            // Remove potential PII from requests
            if (event.request?.headers) {
                delete event.request.headers['Authorization'];
                delete event.request.headers['Cookie'];
            }
            
            // Remove sensitive query params
            if (event.request?.url) {
                try {
                    const url = new URL(event.request.url);
                    ['password', 'token', 'api_key', 'secret'].forEach(param => {
                        url.searchParams.delete(param);
                    });
                    event.request.url = url.toString();
                } catch {
                    // URL parsing failed, leave as-is
                }
            }
            
            return event;
        },
        
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration({
                maskAllText: false,
                blockAllMedia: false,
            }),
        ],
    });
}

/**
 * Set user context for Sentry
 */
export function setSentryUser(user: { id: string; email?: string; username?: string } | null) {
    if (user) {
        Sentry.setUser({
            id: user.id,
            email: user.email,
            username: user.username,
        });
    } else {
        Sentry.setUser(null);
    }
}

/**
 * Capture an error with additional context
 */
export function captureError(error: Error, context?: Record<string, unknown>) {
    if (context) {
        Sentry.withScope(scope => {
            Object.entries(context).forEach(([key, value]) => {
                scope.setTag(key, String(value));
            });
            Sentry.captureException(error);
        });
    } else {
        Sentry.captureException(error);
    }
}

/**
 * Log a message to Sentry
 */
export function logMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
    Sentry.captureMessage(message, level);
}
