import { StoreApi, create } from 'zustand';
import LocalStorage from '../local-storage';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import createTaskSlice, { TaskSlice } from './app/AppSlice';

export type StoreState = TaskSlice;
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
    }),
    {
      name: 'store',
      storage: createJSONStorage(() => ZustandMMKVStorage),
    },
  ),
);

export default useStore;
