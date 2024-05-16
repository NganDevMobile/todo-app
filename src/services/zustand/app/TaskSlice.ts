import { StoreSlice } from '@zustand';

export interface TaskSlice {
  tasks: any[];
  setTasks: (data: any) => void;
  addTask: (task: any) => void;
  updateTask: (task: any) => void;
  deleteTask: (id: string) => void;
}

const createTaskSlice: StoreSlice<TaskSlice> = (set, get) => ({
  tasks: [],
  setTasks: (data: any[]) => set({ tasks: data }),
  addTask: (task: any) => {
    const { tasks } = get();

    const updatedTasks = [task, ...tasks];
    set({ tasks: updatedTasks });
  },
  updateTask: (data: any) => {
    const { tasks } = get();
    const { id, ...task } = data || {};

    set({
      tasks: tasks.map(element =>
        element.id === id ? { ...element, ...task } : element,
      ),
    });
  },
  deleteTask: (id: string) => {
    const { tasks } = get();

    set({ tasks: tasks.filter(e => e.id !== id) });
  },
});

export default createTaskSlice;
