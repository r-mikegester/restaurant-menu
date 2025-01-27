import { create } from "zustand";

interface TabState {
    activeTab: number;
    prevTab: number;
    isAnimating: boolean;
    setActiveTab: (tab: number) => void;
    setAnimating: (animating: boolean) => void;
}

const useTabStore = create<TabState>((set) => ({
    activeTab: 0,
    prevTab: 0,
    isAnimating: false,
    setActiveTab: (tab) =>
        set((state) => ({
            prevTab: state.activeTab,
            activeTab: tab,
        })),
    setAnimating: (animating) =>
        set({
            isAnimating: animating,
        }),
}));

export default useTabStore;
