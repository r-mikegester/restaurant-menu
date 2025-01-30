import React from "react";
import AppRoutes from "./shared/routes/routes";
import ToastNotif from "./components/utils/ToastNotif";
import BottomNavbar from "./components/layout/BottomNav";
import './assets/css/index.css';
import ErrorBoundary from "./components/utils/ErrorBoundary";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <ErrorBoundary>
        <div className="flex-grow">
          <ToastNotif />
          <AppRoutes />
        </div>
        <BottomNavbar />
      </ErrorBoundary>
    </div>
  );
};

export default App;
