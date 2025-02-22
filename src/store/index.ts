import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// import { mountStoreDevtool } from "simple-zustand-devtools";
import userSlice, { UserSliceType } from "./user";




export const userWrapper = create<UserSliceType>()(
    persist(
      (...a) => ({
        ...userSlice(...a),
      }),
      {
        name: "user",
        storage: createJSONStorage(() => localStorage),
      }
    ),
    
);

