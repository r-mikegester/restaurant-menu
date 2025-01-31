import { Icon } from "@iconify/react/dist/iconify.js";
import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    errorMessage: string | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: null,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, errorMessage: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <div className=" p-6 text-center flex flex-col justify-center items-center max-w-lg">
                    <Icon icon="hugeicons:dead" className="size-20"/>
                        <h1 className="text-2xl font-bold text-red-600">Oops! Something went wrong.</h1>
                        <p className="text-gray-600 mt-2">{this.state.errorMessage || "An unexpected error occurred."}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg btn border-none hover:bg-emerald-700"
                            onClick={this.handleRetry}
                        >
                            Retry
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
