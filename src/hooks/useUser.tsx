import { getUser } from '@services/firestore';
import { useMutation } from '@tanstack/react-query';

export const useGetUser = () => {
  return useMutation({
    mutationFn: getUser,
  });
};
