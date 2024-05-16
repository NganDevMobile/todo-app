import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from '@services/firestore';
import { useMutation } from '@tanstack/react-query';
import useStore from '@zustand';
import { useMemo } from 'react';

export const useGetCategories = () => {
  return useMutation({
    mutationFn: getAllCategories,
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: updateCategory,
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: deleteCategory,
  });
};

export const useCategoryTaskCount = () => {
  const tasks = useStore(state => state.tasks);
  const categories = useStore(state => state.categories);

  const taskCount = useMemo(
    () =>
      tasks.reduce((acc, item) => {
        const { catId } = item || {};

        if (acc[catId]) acc[catId] += 1;
        else acc[catId] = 1;

        return acc;
      }, {}),
    [tasks],
  );

  const categoryTaskCount = useMemo(
    () =>
      categories.map(category => ({
        ...category,
        count: taskCount[category.id] ?? 0,
      })),
    [categories, taskCount],
  );

  return categoryTaskCount;
};
