import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUser = create(
  persist(
    (set) => ({
      userDetails: "",
      setUserDetails: (userDetails) => set({ userDetails }),
    }),
    {
      name: "user",
    }
  )
);

export default useUser;
