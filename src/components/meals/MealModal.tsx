"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Meal } from "../../shared/store/mealsStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef, useState } from "react";

const MealModal = ({
    meal,
    onClose,
}: {
    meal: Meal | null;
    onClose: () => void;
    addToFavorites?: (meal: Meal) => void;
    removeFromFavorites?: (mealId: string) => void;
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Collapse toggle
    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    if (!meal) return null;

    return (
        <AnimatePresence>
            <>
                <motion.div
                    className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900/70"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={onClose}
                />
                <motion.div
                    className="fixed inset-0 z-10 flex flex-col items-center justify-center"
                    onClick={onClose}
                >
                    <motion.div
                        className="relative flex flex-col items-center justify-center max-h-screen p-4 m-4 overflow-hidden bg-white w-fit rounded-3xl"
                        layoutId={`meal-${meal.idMeal}`}
                        onClick={(e) => e.stopPropagation()} // Prevent modal click from triggering close
                    >
                        <div className="mx-auto overflow-y-auto md:max-h-screen md:max-w-3xl max-w-96 h-fit w-fit">
                            <div className="grid w-full h-full grid-cols-1 md:grid-cols-12 grid-rows-12 gap-4 overflow-hidden">
                                <div className="col-span-12 md:col-span-full row-span-2 ">
                                    <div className="flex items-center justify-between w-full h-full">
                                        <div className="w-72 md:w-full h-fit flex flex-col ">
                                            <motion.h2
                                                className="text-2xl font-bold text-gray-700"
                                                layoutId={`title-${meal.idMeal}`}
                                            >
                                                {meal.strMeal}
                                            </motion.h2>
                                            <motion.p className="text-lg font-semibold text-gray-500">
                                                Price: <span className="text-green-700">${meal.price?.toFixed(2)}</span>
                                            </motion.p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-5 row-span-5 md:row-span-7 row-start-3 col-start-1">
                                    <div
                                        className="relative overflow-hidden hidden md:flex  shadow-md cursor-pointer rounded-2xl focus:outline-none"
                                        aria-label="Toggle Collapse"
                                    >
                                        <img
                                            src={meal.strMealThumb}
                                            alt={meal.strMeal}
                                            className="rounded-none hidden w-full h-full md:flex" // Rotate the image on collapse toggle
                                        />
                                    </div>
                                </div>
                                <div className="w-full h-full col-span-12 md:col-span-5 row-span-10 flex md:hidden  md:row-span-6 row-start-3 col-start-1">
                                    <div className="flex flex-col ">
                                        <div
                                            onClick={toggleCollapse}
                                            className="relative overflow-hidden shadow-md cursor-pointer rounded-2xl focus:outline-none"
                                            aria-label="Toggle Collapse"
                                        >
                                            <img
                                                src={meal.strMealThumb}
                                                alt={meal.strMeal}
                                                className={`transition-transform object-contain md:hidden duration-300 rounded-2xl ${isCollapsed ? "" : ""}`} // Rotate the image on collapse toggle
                                            />

                                            <button
                                                onClick={toggleCollapse}
                                                className="absolute bg-transparent border-2  border-none bottom-3 right-2 md:flex btn btn-sm btn-circle hover:bg-transparent hover:shadow-inner hover:bg-emerald-100 hover:border-2"
                                                aria-label="Toggle Search Collapse"
                                            >
                                                <Icon
                                                    icon={isCollapsed ? "mdi:chevron-up" : "mdi:chevron-down"}
                                                    className="text-2xl text-white w-9 h-9 hover:text-emerald-700"
                                                />
                                            </button>
                                        </div>
                                        {/* Collapsible Content */}
                                        <div
                                            ref={contentRef}
                                            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isCollapsed ? "max-h-full" : "max-h-0"}`}
                                            style={{
                                                maxHeight: isCollapsed ? `${contentRef.current?.scrollHeight}px` : "0",
                                            }}
                                        >
                                            <div className="flex items-center h-40 justify-between gap-6 p-4 bg-gray-100 border-2 border-gray-200 shadow-inner rounded-2xl md:rounded-2xl">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-700">Category: {meal.strCategory || "N/A"}</h3>
                                                    <h3 className="text-lg font-semibold text-gray-700">Region: {meal.strArea || "N/A"}</h3>
                                                    <h3 className="text-lg font-semibold text-gray-700">Tags: {meal.strTags ? meal.strTags : "No tags available"}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-full col-span-12 md:col-span-5 row-span-3 row-start-10 col-start-1  md:flex hidden">
                                    <div className="flex items-center h-full w-full justify-between gap-6 p-4 bg-gray-100 border-2 border-gray-200 shadow-inner rounded-2xl md:rounded-2xl">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-700">Category: {meal.strCategory || "N/A"}</h3>
                                            <h3 className="text-lg font-semibold text-gray-700">Region: {meal.strArea || "N/A"}</h3>
                                            <h3 className="text-lg font-semibold text-gray-700">Tags: {meal.strTags ? meal.strTags : "No tags available"}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full overflow-y-auto col-span-12 md:col-span-7 rounded-2xl  md:row-span-10 md:col-start-6">
                                    <div className="flex flex-col items-center justify-start h-full ">
                                        <div className="bg-gray-300 collapse collapse-arrow">
                                            <input type="checkbox" />
                                            <div className="text-xl font-semibold text-gray-700 collapse-title ">Instructions:</div>
                                            <div className="collapse-content">
                                                <pre className="w-full p-3 overflow-y-auto text-sm text-gray-600 break-words whitespace-pre-wrap bg-gray-100 border-2 border-gray-200 shadow-inner h-96 rounded-2xl">{meal.strInstructions || "No instructions available"}</pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            className="absolute font-semibold text-gray-700 bg-white border-2 border-none shadow-inner rounded-2xl btn-square btn top-5 right-5 hover:bg-red-400 hover:text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                        >
                            <Icon icon="line-md:close" className="size-10" />
                        </button>
                    </motion.div>
                </motion.div>
            </>
        </AnimatePresence>
    );
};

export default MealModal;
