import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

type CollapseButtonProps = {
    isCollapsed: boolean;
    toggleCollapse: () => void;
};

const CollapseButton: React.FC<CollapseButtonProps> = ({ isCollapsed, toggleCollapse }) => {
    return (
        <button
            onClick={toggleCollapse}
            className="bg-gray-100 hidden md:flex border-none shadow-inner btn btn-square border-2 hover:bg-transparent hover:shadow-inner hover:bg-emerald-100 hover:border-2 border-gray-300"
            aria-label="Toggle Search Collapse"
        >
            <Icon
                icon={isCollapsed ? "mdi:chevron-up" : "mdi:chevron-down"}
                className="text-2xl text-gray-700 w-9 h-9 hover:text-emerald-700"
            />
        </button>
    );
};

export default CollapseButton;
