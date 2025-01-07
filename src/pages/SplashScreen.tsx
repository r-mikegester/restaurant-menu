import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  // Redirect to the product list after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/ProductList");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Logo animation */}
      <div className="flex flex-col items-center space-x-3 animate-pulse">
        <img
          src="https://via.placeholder.com/100"
          alt="App Logo"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <h1 className="text-3xl font-bold text-blue-600">Restaurante Padrino</h1>
      </div>

      {/* Loading spinner */}
      <div className="mt-8">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
