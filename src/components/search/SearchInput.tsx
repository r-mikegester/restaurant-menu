import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

type SearchInputProps = {
    localQuery: string;
    setLocalQuery: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
    loading: boolean;
};

const SearchInput: React.FC<SearchInputProps> = ({ localQuery, setLocalQuery, onSearch, loading }) => {
    return (
        <>
            {/* Desktop Input Field */}
            <input
                type="text"
                placeholder="Search meals..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="hidden w-full h-12 p-4 px-4 font-semibold text-left bg-gray-100 border-2 shadow-inner md:w-96 md:block drop-shadow-md text-emerald-700 rounded-xl"
            />

            {/* Loading Spinner */}
            {loading ? (
                <div className="flex items-center justify-center">
                    <button
                        onClick={onSearch}
                        className="items-center hidden bg-white border-none shadow-inner md:flex drop-shadow-md hover:bg-transparent hover:shadow-inner rounded-xl btn btn-square"
                    >
                        <Icon icon="line-md:downloading-loop" className="w-8 h-8 text-2xl text-emerald-600" />
                    </button>
                </div>
            ) : (
                <button
                    onClick={onSearch}
                    className="items-center hidden bg-gray-100 border-2 border-gray-300 border-none shadow-inner md:flex hover:border-2 text-gray- hover:bg-transparent hover:shadow-inner hover:bg-emerald-100 rounded-xl btn btn-square"
                >
                    <Icon icon="hugeicons:search-02" className="w-8 h-8 text-2xl text-gray-700 hover:text-emerald-700" />
                </button>
            )}
        </>
    );
};

export default SearchInput;
