import React from "react";
import { showErrorToast } from "../shared/libs/toast"; // Import the toast helper
import { Icon } from "@iconify/react/dist/iconify.js";

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
          <section className="flex items-center h-full sm:p-16 dark:bg-gray-50 dark:text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
            <Icon icon="hugeicons:dead" className="w-40 h-40 text-red-700 animate-pulse"/>
              <h1 className="text-3xl font-bold text-red-600">Oops! An error occurred.</h1>
              <p className="mt-4 text-gray-600">
                We encountered an unexpected issue. Please refresh the page or try again later.
              </p>
              <a rel="noopener noreferrer" href="/" className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Back to homepage</a>
            </div>
          </section>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
