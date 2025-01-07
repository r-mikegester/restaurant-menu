import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Onboarding from "./pages/Onboarding";
import SplashScreen from "./pages/SplashScreen";
import ProductDetails from "./pages/ProductDetails";
import './App.css'
import './index.css'
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Show loading animation for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Check session storage for onboarding state
      const onboardingComplete = sessionStorage.getItem("onboardingComplete") === "true";
      setShowOnboarding(!onboardingComplete);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  
  return (
    <Router>
       <Routes>
        {/* Show loading animation first */}
        {isLoading ? (
          <Route path="*" element={<SplashScreen />} />
        ) : showOnboarding ? (
          // If onboarding not complete in the session, show onboarding
          <Route path="*" element={<Onboarding />} />
        ) : (
          // Otherwise, show product list
          <>
            <Route path="/ProductList" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </>
        )}
      </Routes>
    </Router>
  );
};


export default App
