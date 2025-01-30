import React from "react";
import useStore from "../shared/store/useStore";

const Counter: React.FC = () => {
    const { count, increment, decrement } = useStore();

    return (
        <div className="flex flex-col items-center space-y-4 p-4">
            <h1 className="text-2xl font-bold">Count: {count}</h1>
            <div className="space-x-4">
                <button
                    onClick={increment}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Increment
                </button>
                <button
                    onClick={decrement}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Decrement
                </button>
            </div>
        </div>
    );
};

export default Counter;
