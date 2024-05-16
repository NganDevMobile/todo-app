import { API_METHODS, IPhoto } from 'models';
import { ServicesEndPoints } from '../serviceEndpoints';
import serviceAdapter from '../serviceAdaptor';

export const getListTask = async (): Promise<IPhoto[]> => {
  return new Promise((resolve, reject) => {
    serviceAdapter<IPhoto[], any>(
      API_METHODS.GET,
      `${ServicesEndPoints.PHOTOS}`,
    )
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};
