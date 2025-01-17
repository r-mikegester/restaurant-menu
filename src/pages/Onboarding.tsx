import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const slides = [
  {
    title: "Welcome to Kumpadre!",
    description: "A Simple Restaurant Menu Overview.",
    // image: "https://via.placeholder.com/150",
    icon: "hugeicons:service",
  },
  { title: "Simplicity", description: "A Menu that attracts the eye.", image: "https://via.placeholder.com/150" },
  { title: "Elegance", description: "Crafted with Love, Passion.", image: "https://via.placeholder.com/150" },
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      sessionStorage.setItem("onboardingComplete", "true");
      navigate("/Home");
    }
  };

  const handleSkip = () => {
    sessionStorage.setItem("onboardingComplete", "true");
    navigate("/Home");
  };

  return (
    <div className="flex flex-col h-[100svh]">
      <div className="flex flex-col h-full ">
        <div className="justify-end flex p-4 ">
          <button className="px-4 py-2 hover:bg-gray-300 text-black rounded" onClick={handleSkip}>
            Skip
          </button>
        </div>
        <div className="justify-center flex flex-col items-center h-full">
          {slides[currentSlide].icon && currentSlide === 0 && (
            <Icon icon={slides[currentSlide].icon} className="w-40 h-40 text-emerald-500 mb-4" />
          )}
          {/* <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="w-40 h-40 mb-4" /> */}
          <h1 className="text-xl font-bold">{slides[currentSlide].title}</h1>
          <p className="text-gray-600">{slides[currentSlide].description}</p>
        </div>
      </div>

      <div className="flex flex-col justify-center ">
        <div className="sticky bottom-0 z-10">
          <div className="w-screen p-6">
            <button className="p-4 md:p-2 bg-emerald-500 w-full md:w-60 text-white rounded-xl" onClick={handleNext}>
              {currentSlide === slides.length - 1 ? "Get Started!" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
