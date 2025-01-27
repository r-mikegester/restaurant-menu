import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import useTabStore from "../shared/store/tabStore"; // Import the Zustand store
import { useNavigate } from "react-router-dom"; // Import useNavigate

const BottomNav: React.FC = () => {
    const { activeTab, isAnimating, setActiveTab } = useTabStore(); // Get tab-related states and actions from Zustand
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const views = [
        { id: 0, name: "Home", path: "/", icon: <Icon icon="hugeicons:home-03" width="24" height="24" /> },
        { id: 1, name: "Search", path: "/search", icon: <Icon icon="hugeicons:search-02" width="24" height="24" /> },
        { id: 2, name: "Favorites", path: "/favorites", icon: <Icon icon="hugeicons:service" width="24" height="24" /> },
        { id: 3, name: "Misc", path: "/misc", icon: <Icon icon="hugeicons:layer-add" width="24" height="24" /> },
    ];

    return (
        <nav className="fixed left-0 right-0 flex items-center justify-around p-2 mx-auto bg-white border shadow-lg rounded-2xl min-w-80 w-fit md:w-80 drop-shadow-md bottom-3">
            {views.map((view) => (
                <button
                    key={view.id}
                    className={`flex flex-col w-full items-center transition-all duration-300 ${
                        activeTab === view.id
                            ? "text-emerald-500 bg-emerald-100 p-2 rounded-xl font-bold"
                            : "p-2 text-gray-500"
                    }`}
                    onClick={() => {
                        if (!isAnimating) {
                            setActiveTab(view.id); // Update the active tab in Zustand
                            navigate(view.path); // Navigate to the corresponding route
                        }
                    }}
                    disabled={isAnimating} // Disable buttons during animations
                >
                    {view.icon}
                    {activeTab === view.id && (
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="mt-1 text-sm"
                        >
                            {view.name}
                        </motion.span>
                    )}
                </button>
            ))}
        </nav>
    );
};

export default BottomNav;
