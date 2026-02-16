import { useCallback } from 'react';
import { captureError } from '@/lib/sentry';
import { toast } from 'sonner';

interface ApiErrorOptions {
    showToast?: boolean;
    toastMessage?: string;
    context?: Record<string, unknown>;
}

/**
 * Hook for handling API errors with Sentry integration
 */
export function useApiError() {
    const handleError = useCallback((error: Error, options: ApiErrorOptions = {}) => {
        const {
            showToast = true,
            toastMessage = 'Something went wrong',
            context = {}
        } = options;

        // Log to console
        console.error('API Error:', error);

        // Send to Sentry
        captureError(error, {
            ...context,
            source: 'api',
        });

        // Show toast notification
        if (showToast) {
            toast.error(toastMessage, {
                description: error.message || 'Please try again later',
            });
        }

        return error;
    }, []);

    const handleAsync = useCallback(async <T,>(
        promise: Promise<T>,
        options: ApiErrorOptions = {}
    ): Promise<T | null> => {
        try {
            return await promise;
        } catch (error) {
            handleError(error as Error, options);
            return null;
        }
    }, [handleError]);

    return { handleError, handleAsync };
}
