import { useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  { title: "Welcome!", description: "Discover our app.", image: "https://via.placeholder.com/150" },
  { title: "Features", description: "Learn what we offer.", image: "https://via.placeholder.com/150" },
  { title: "Get Started", description: "Enjoy the experience.", image: "https://via.placeholder.com/150" },
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      sessionStorage.setItem("onboardingComplete", "true");
      navigate("/");
    }
  };

  const handleSkip = () => {
    sessionStorage.setItem("onboardingComplete", "true");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="w-40 h-40 mb-4" />
      <h1 className="text-xl font-bold">{slides[currentSlide].title}</h1>
      <p className="text-gray-600">{slides[currentSlide].description}</p>
      <div className="mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded mr-2" onClick={handleNext}>
          {currentSlide === slides.length - 1 ? "Finish" : "Next"}
        </button>
        <button className="px-4 py-2 bg-gray-300 text-black rounded" onClick={handleSkip}>
          Skip
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
