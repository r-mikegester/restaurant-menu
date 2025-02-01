import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

type CollapseButtonProps = {
    isCollapsed: boolean;
    toggleCollapse: () => void;
};

const CollapseButton: React.FC<CollapseButtonProps> = ({ isCollapsed, toggleCollapse }) => {
    return (
        <>
        <button
            onClick={toggleCollapse}
            className="hidden bg-gray-100 border-2 border-gray-300 border-none shadow-inner md:flex btn btn-square hover:bg-transparent hover:shadow-inner hover:bg-emerald-100 hover:border-2"
            aria-label="Toggle Search Collapse"
        >
            <Icon
                icon={isCollapsed ? "mdi:chevron-up" : "mdi:chevron-down"}
                className="text-2xl text-gray-700 w-9 h-9 hover:text-emerald-700" />
        </button>
        <button
            onClick={toggleCollapse}
            className="bg-white border-none shadow-inner md:hidden btn btn-square hover:bg-transparent hover:shadow-inner"
            aria-label="Toggle Search Collapse"
        >
            <Icon
                icon={isCollapsed ? "mdi:chevron-up" : "hugeicons:search-02"}
                className="size-8" />
        </button>
        </>
    );
};

export default CollapseButton;
