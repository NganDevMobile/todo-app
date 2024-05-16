import { StoreSlice } from '@zustand';

export interface UserSlice {
  user: any;
  setUser: (data: any) => void;
  clearUser: () => void;
}

const createUserSlice: StoreSlice<UserSlice> = (set, get) => ({
  user: null,
  setUser: (data: any) => set({ user: data }),
  clearUser: async () => set({ user: null }),
});

export default createUserSlice;
