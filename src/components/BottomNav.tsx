import React from "react";
import { NavigateFunction } from "react-router-dom";
import { Icon } from "@iconify/react"; // Import Iconify

interface BottomNavProps {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  swipeableViews: {
    path: string;
    label: string;
    icon: string; // Add an icon property for each view
  }[];
  navigate: NavigateFunction;
}

const BottomNav: React.FC<BottomNavProps> = ({
  activeIndex,
  setActiveIndex,
  swipeableViews,
  navigate,
}) => {
  return (
    <div className="fixed bottom-0 w-full flex justify-around rounded-t-3xl bg-gray-100 border-2 border-gray-300 p-3 shadow-lg">
      {swipeableViews.map((view, index) => (
        <button
          key={view.path}
          className={`flex-1 text-center py-2 ${
            activeIndex === index
              ? "text-emerald-500 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => {
            setActiveIndex(index);
            navigate(view.path);
          }}
        >
          <Icon
            icon={view.icon}
            className={`text-2xl mx-auto ${
              activeIndex === index ? "text-emerald-500" : "text-gray-500"
            }`}
          />
          <span className="text-sm">{view.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
