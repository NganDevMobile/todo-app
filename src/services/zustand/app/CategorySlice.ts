import { StoreSlice } from '@zustand';

export interface CategorySlice {
  categories: any[];
  setCategories: (data: any) => void;
  addCategory: (category: any) => void;
  updateCategory: (data: any) => void;
  deleteCategory: (id: string) => void;
}

const createCategorySlice: StoreSlice<CategorySlice> = (set, get) => ({
  categories: [],
  setCategories: (data: any[]) => set({ categories: data }),
  addCategory: (category: any) => {
    const { categories } = get();
    set({ categories: [...categories, category] });
  },
  updateCategory: (data: any) => {
    const { categories } = get();
    const { id, ...category } = data || {};

    set({
      categories: categories.map(element =>
        element.id === id ? { ...element, ...category } : element,
      ),
    });
  },
  deleteCategory: (id: string) => {
    const { categories, tasks } = get();

    set({
      categories: categories.filter(e => e.id !== id),
      tasks: tasks.filter(e => e.catId !== id),
    });
  },
});

export default createCategorySlice;
