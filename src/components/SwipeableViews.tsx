import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SwipeableViewsProps {
    activeTab: number;
    prevTab: number;
    views: { name: string; component: React.ReactNode }[];
}

const SwipeableViews: React.FC<SwipeableViewsProps> = ({ activeTab, prevTab, views }) => {
    const calculateDirection = (current: number, previous: number) => {
        const x = current > previous ? 1 : current < previous ? -1 : 0;
        return { x, y: 0 };
    };

    const variants = {
        enter: ({ x }: { x: number }) => ({
            x: x * 100 + "%",
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: ({ x }: { x: number }) => ({
            x: x * -100 + "%",
            opacity: 0,
        }),
    };

    return (
        <AnimatePresence initial={false} custom={calculateDirection(activeTab, prevTab)}>
            <motion.div
                key={activeTab}
                className="flex-shrink-0 w-full h-full overflow-hidden "
                custom={calculateDirection(activeTab, prevTab)}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    type: "spring",
                    stiffness: 1000,
                    damping: 50,
                    duration: 0,
                }}
            >
                {views[activeTab].component}
            </motion.div>
        </AnimatePresence>
    );
};

export default SwipeableViews;
