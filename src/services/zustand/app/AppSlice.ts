import { StoreSlice } from '@zustand';

export interface TaskSlice {
  isWalkthroughAvailable: boolean;
  setWalkthrough: (value: boolean) => void;
  isDarkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const createTaskSlice: StoreSlice<TaskSlice> = set => ({
  isWalkthroughAvailable: true,
  setWalkthrough: (value: boolean) => set({ isWalkthroughAvailable: value }),
  isDarkMode: true,
  setDarkMode: (value: boolean) => set({ isDarkMode: value }),
});

export default createTaskSlice;
