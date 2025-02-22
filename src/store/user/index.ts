import { StateCreator } from "zustand";

export interface UserSliceType {
    user:  any ;
    setUser: (user: UserSliceType['user'])=>void;
}

const userSlice: StateCreator<UserSliceType>= (set) => ({
    user:{},
    setUser: (user:any)=>{
        set(()=>{
            return {user }
        })
    }
})

export default userSlice