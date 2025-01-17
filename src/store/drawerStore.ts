// src/store/drawerStore.ts

import { create } from "zustand";

interface DrawerState {
  height: string;
  marginTop: string;
  setHeight: (newHeight: string) => void;
  setMarginTop: (newMarginTop: string) => void;
}

const useDrawerStore = create<DrawerState>((set) => ({
  height: "75vh",  // Default height set to 75vh
  marginTop: "0px", // Initially no margin-top (content is not revealed)
  setHeight: (newHeight) => set({ height: newHeight }),
  setMarginTop: (newMarginTop) => set({ marginTop: newMarginTop }),
}));

export default useDrawerStore;
