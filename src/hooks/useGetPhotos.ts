import { getListPhotos } from '@services/api';
import { useMutation } from '@tanstack/react-query';

export const useGetPhotos = () => {
  return useMutation({
    mutationFn: () => getListPhotos(),
  });
};
