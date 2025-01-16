import { create } from "zustand";

const useStore = create((set) => ({
  activeTab: "",
  setActiveTab: (activeTab) => set({ activeTab }),
}));

export default useStore;
