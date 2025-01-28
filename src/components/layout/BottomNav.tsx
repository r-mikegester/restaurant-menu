import { NavLink } from "react-router-dom";

const BottomNavbar = () => {
    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-200">
            <ul className="flex justify-around items-center py-3">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex flex-col items-center ${isActive ? "text-blue-500" : "text-gray-500"
                            }`
                        }
                    >
                        <span>🏠</span>
                        <span className="text-sm">Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/search"
                        className={({ isActive }) =>
                            `flex flex-col items-center ${isActive ? "text-blue-500" : "text-gray-500"
                            }`
                        }
                    >
                        <span>🔍</span>
                        <span className="text-sm">Search</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                            `flex flex-col items-center ${isActive ? "text-blue-500" : "text-gray-500"
                            }`
                        }
                    >
                        <span>⭐</span>
                        <span className="text-sm">Favorites</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/misc"
                        className={({ isActive }) =>
                            `flex flex-col items-center ${isActive ? "text-blue-500" : "text-gray-500"
                            }`
                        }
                    >
                        <span>⚙️</span>
                        <span className="text-sm">Misc</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default BottomNavbar;
