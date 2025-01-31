import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMealStore } from "../../shared/store/mealsStore"; 

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

const Carousel = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [direction, setDirection] = useState(0);
    const { meals, fetchRandomMeals } = useMealStore();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [limitedMeals, setLimitedMeals] = useState<Meal[]>([]); 

    
    useEffect(() => {
        const fetchMeals = async () => {
            await fetchRandomMeals(); 
           
            setLimitedMeals(meals.slice(0, 10));
            setLoading(false);
        };
        fetchMeals();
    }, [fetchRandomMeals, meals]); 

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 600 : -600,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 600 : -600,
            opacity: 0,
        }),
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + limitedMeals.length) % limitedMeals.length);
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % limitedMeals.length);
    };

    return (
        <div className="relative flex h-full p-5 select-none md:items-center md:justify-center">
            <CustomCursor
                containerRef={containerRef}
                onClickLeft={handlePrev}
                onClickRight={handleNext}
            />
            <div
                ref={containerRef}
                className="relative flex items-center justify-center w-full h-full mx-auto overflow-hidden border-4 border-gray-700 rounded-3xl text-white/90"
            >
                {loading ? (
                    
                    <div className="absolute flex items-center justify-center w-full h-full bg-gray-700 skeleton">
                        <div className="absolute w-40 h-10 bg-gray-500 rounded-lg skeleton left-5 top-5" />
                    </div>
                ) : (
                    <AnimatePresence initial={false} custom={direction}>
                        {limitedMeals.length > 0 && (
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    opacity: { duration: 0.2 },
                                }}
                                className="absolute flex items-center justify-center w-full h-full text-4xl text-white"
                            >
                                {/* Image */}
                                <img
                                    src={limitedMeals[currentIndex]?.strMealThumb}
                                    alt={limitedMeals[currentIndex]?.strMeal}
                                    className="object-cover object-top w-full h-full"
                                />
                                {/* Title Overlay */}
                                <div className="absolute px-4 py-2 rounded-lg bg-gray-900/50 glass top-5 md:left-5 inset-x-auto">
                                    <h3 className="text-lg font-semibold text-white">
                                        {limitedMeals[currentIndex]?.strMeal}
                                    </h3>
                                </div>
                            </motion.div>
                        )}
                        {/* Indicators */}
                        <div className="absolute bottom-0 left-0 right-0 flex items-center h-10 gap-1 mx-auto w-fit">
                            {Array.from({ length: limitedMeals.length }).map((_, index) => (
                                <motion.div
                                    key={index}
                                    animate={{
                                        width: index === currentIndex ? 40 : 2,
                                    }}
                                    className="w-3 h-3 bg-white border-2 border-gray-700 rounded-full min-w-3"
                                />
                            ))}
                        </div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

interface CustomCursorProps {
    containerRef: React.RefObject<HTMLDivElement>;
    onClickLeft: () => void;
    onClickRight: () => void;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
    containerRef,
    onClickLeft,
    onClickRight,
}) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isInside, setIsInside] = useState(false);
    const [rotation, setRotation] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const isInside =
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom;
                setIsInside(isInside);

                if (isInside) {
                    const centerX = rect.left + rect.width / 2;
                    setRotation(e.clientX < centerX);
                }
            }
        };

        const handleClick = (e: MouseEvent) => {
            if (isInside && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                e.clientX < centerX ? onClickLeft() : onClickRight();
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
        };
    }, [containerRef, isInside, onClickLeft, onClickRight]);

    return (
        <div>
            <AnimatePresence>
                {isInside && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="fixed z-50"
                        style={{
                            left: mousePosition.x - 25,
                            top: mousePosition.y - 25,
                        }}
                    >
                        <motion.div
                            whileTap={{ scale: 0.8 }}
                            className="flex items-center justify-center w-[50px] h-[50px] bg-white text-gray-700 border-gray-700 shadow-inner drop-shadow-lg border-2 -z-10 rounded-full"
                            animate={{
                                rotate: rotation ? 180 : 0,
                                transition: { duration: 0.5 },
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <Icon icon="hugeicons:arrow-right-01" className="w-10 h-10" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Carousel;
