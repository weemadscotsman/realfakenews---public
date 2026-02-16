import { Component, type ErrorInfo, type ReactNode } from 'react';
import * as Sentry from '@sentry/react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    eventId: string | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        eventId: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, eventId: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        
        // Send to Sentry
        Sentry.withScope(scope => {
            scope.setExtras(errorInfo as Record<string, unknown>);
            const eventId = Sentry.captureException(error);
            this.setState({ eventId });
        });
    }

    private handleReload = () => {
        window.location.reload();
    };

    private handleReport = () => {
        if (this.state.eventId) {
            Sentry.showReportDialog({ eventId: this.state.eventId });
        }
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-center">
                        <div className="text-6xl mb-4">💥</div>
                        <h1 className="text-2xl font-bold text-red-500 mb-2">
                            Reality Buffer Overflow
                        </h1>
                        <p className="text-zinc-400 mb-6">
                            The AGC has detected a critical error in your timeline. 
                            Our appliance overlords are working to restore order.
                        </p>
                        
                        <div className="bg-zinc-950 rounded p-4 mb-6 text-left overflow-hidden">
                            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                                Error Code
                            </p>
                            <code className="text-red-400 text-sm font-mono break-all">
                                {this.state.error?.name}: {this.state.error?.message}
                            </code>
                            {this.state.eventId && (
                                <>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider mt-4 mb-2">
                                        Incident ID
                                    </p>
                                    <code className="text-zinc-400 text-sm font-mono">
                                        {this.state.eventId}
                                    </code>
                                </>
                            )}
                        </div>

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={this.handleReload}
                                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                            >
                                Reload Timeline
                            </button>
                            {this.state.eventId && (
                                <button
                                    onClick={this.handleReport}
                                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
                                >
                                    Report to AGC
                                </button>
                            )}
                        </div>

                        <p className="mt-6 text-xs text-zinc-600">
                            Unit 404 has been notified. The crumb tray is being emptied.
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
