import { StoreApi, create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';
import LocalStorage from '../local-storage';
import createCategorySlice, { CategorySlice } from './app/CategorySlice';
import createTaskSlice, { TaskSlice } from './app/TaskSlice';
import createUserSlice, { UserSlice } from './app/UserSlice';

export type StoreState = TaskSlice & CategorySlice & UserSlice;
export type StoreSlice<T> = (
  set: StoreApi<StoreState>['setState'],
  get: StoreApi<StoreState>['getState'],
) => T;

const ZustandMMKVStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    return LocalStorage.set(name, value);
  },
  getItem: (name: string) => {
    const value = LocalStorage.getString(name);
    return value ?? null;
  },
  removeItem: (name: string) => {
    return LocalStorage.delete(name);
  },
};

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      ...createTaskSlice(set, get),
      ...createCategorySlice(set, get),
      ...createUserSlice(set, get),
    }),
    {
      name: 'store',
      storage: createJSONStorage(() => ZustandMMKVStorage),
    },
  ),
);

export default useStore;
