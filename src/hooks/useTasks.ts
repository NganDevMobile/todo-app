import { getAllTasks } from '@services/firestore/task';
import { useMutation } from '@tanstack/react-query';

export const useGetTasks = () => {
  return useMutation({
    mutationFn: (userId: string) => getAllTasks(userId),
  });
};
