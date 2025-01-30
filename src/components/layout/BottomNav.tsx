import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import useNavStore from "../../shared/store/navStore";

const BottomNavbar = () => {
    const { activeTab, isAnimating, setActiveTab } = useNavStore();

    const views = [
        { id: 0, name: "Home", icon: "hugeicons:home-03", to: "/" },
        { id: 1, name: "Search", icon: "hugeicons:search-02", to: "/search" },
        { id: 2, name: "Favorites", icon: "hugeicons:service", to: "/favorites" },
    ];

    return (
        <nav className="fixed left-0 right-0 flex items-center justify-around p-2 mx-auto bg-white border shadow-lg rounded-2xl min-w-80 w-fit md:w-80 drop-shadow-md bottom-3">
            {views.map((view) => (
                <NavLink
                    key={view.id}
                    to={view.to}
                    className={({ isActive }) =>
                        `relative flex flex-col w-full items-center transition-all duration-150 ${isActive
                            ? "text-emerald-500 bg-emerald-100 p-2 rounded-xl font-bold"
                            : "p-2 text-gray-500"
                        }`
                    }
                    onClick={() => {
                        if (!isAnimating) {
                            setActiveTab(view.id);
                        }
                    }}
                >
                    <Icon icon={view.icon} width="24" height="24" />
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
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNavbar;
