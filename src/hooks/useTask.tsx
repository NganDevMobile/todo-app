import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from '@services/firestore';
import { useMutation } from '@tanstack/react-query';
import icons from '@theme/icons';
import images from '@theme/images';
import { Count } from '@types';
import useStore from '@zustand';
import { useMemo, useRef, useState } from 'react';
import { colors } from 'utils';
import { getToday } from 'utils/date';

export const useGetTasks = () => {
  return useMutation({
    mutationFn: getAllTasks,
  });
};

export const useCreateTask = () => {
  return useMutation({
    mutationFn: createTask,
  });
};

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: updateTask,
  });
};

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: deleteTask,
  });
};

const sortByPriority = (array: any[] = []) => {
  return array.sort((a, b) => a.priority - b.priority);
};

export const useStatusTaskCount = () => {
  const tasks = useStore(state => state.tasks);

  const taskCount = useMemo(
    () =>
      tasks.reduce(
        (acc, item) => {
          switch (item.status) {
            case 'completed':
              acc.completedCount += 1;
              break;

            case 'pending':
              acc.pendingCount += 1;
              break;

            case 'cancelled':
              acc.cancelledCount += 1;
              break;

            case 'doing':
              acc.doingCount += 1;
              break;
          }

          return acc;
        },
        {
          completedCount: 0,
          pendingCount: 0,
          cancelledCount: 0,
          doingCount: 0,
        },
      ),
    [tasks],
  );

  const leftStatusTasks: Array<Count> = [
    {
      type: 'completed',
      name: 'Completed',
      colors: colors.complete,
      countTask: taskCount.completedCount,
      icon: images.complete,
      imageBackground: images.imgBGComplete,
    },
    {
      type: 'cancelled',
      name: 'Cancelled',
      colors: colors.canceled,
      countTask: taskCount.cancelledCount,
      icon: icons.canceled,
      imageBackground: images.imgBGCanceled,
    },
  ];

  const rightStatusTasks: Array<Count> = [
    {
      type: 'pending',
      name: 'Pending',
      colors: colors.pending,
      countTask: taskCount.pendingCount,
      icon: icons.pending,
      imageBackground: images.imgBGPending,
    },
    {
      type: 'doing',
      name: 'On Going',
      colors: colors.onGoing,
      countTask: taskCount.doingCount,
      icon: images.onGoing,
      imageBackground: images.imgBGOnGoing,
    },
  ];

  return { leftStatusTasks, rightStatusTasks };
};

export const useDateTask = () => {
  const refToday = useRef(getToday());
  const [selectedDate, setDate] = useState(getToday());

  const tasks = useStore(state => state.tasks);

  const isToday = useMemo(
    () => selectedDate === refToday.current,
    [selectedDate],
  );

  const dateTasks = useMemo(
    () => sortByPriority(tasks.filter(e => e.date === selectedDate)),
    [tasks, selectedDate],
  );

  return { selectedDate, dateTasks, setDate, isToday };
};

export const useCategoryTask = (id: string) => {
  const tasks = useStore(state => state.tasks);

  const categoryTasks = useMemo(
    () => sortByPriority(tasks.filter(e => e.catId === id)),
    [tasks, id],
  );

  return categoryTasks;
};

export const useStatusTask = (status: string) => {
  const tasks = useStore(state => state.tasks);

  const statusTasks = useMemo(
    () => sortByPriority(tasks.filter(e => e.status === status)),
    [tasks, status],
  );

  return statusTasks;
};
