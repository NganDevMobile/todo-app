import firestore from '@react-native-firebase/firestore';
import { StoreSlice } from '@zustand';

export interface TaskSlice {
  tasks: any[];
  setTasks: (data: any) => void;
}

const createTaskSlice: StoreSlice<TaskSlice> = set => ({
  tasks: [],
  setTasks: (data: any[]) => set({ tasks: data }),
});

export default createTaskSlice;
