import React from "react";

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            {children}
        </React.Suspense>
    );
};

export default ErrorBoundary;
