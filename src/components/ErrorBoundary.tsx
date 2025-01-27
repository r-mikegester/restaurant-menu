import React from "react";
import { showErrorToast } from "../shared/libs/toast"; // Import the toast helper

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state to render fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error details to the console
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Show error notification
    showErrorToast("Something went wrong! Please try again later.");
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-3xl font-bold text-red-600">Oops! An error occurred.</h1>
          <p className="mt-4 text-gray-600">
            We encountered an unexpected issue. Please refresh the page or try again later.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
