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

const getAll = async (
  userId: string,
  onSuccess: (value: Category[]) => void,
  onFailed: (error: Error) => any,
) => {
  return await instance
    .where(
      firestore.Filter.or(
        firestore.Filter('userId', '==', userId),
        firestore.Filter('isDefault', '==', true),
      ),
    )
    .get()
    .then(querySnapshot => {
      let data: Category[] = [];
      querySnapshot.forEach(doc => {
        const { userId, name, isDefault = false } = doc.data();

        data.push({ id: doc.id, userId, name, isDefault });
      });
      return onSuccess(data);
    })
    .catch(onFailed);
};
