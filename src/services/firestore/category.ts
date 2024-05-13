import { TaskService } from '@services/firestore';
import firestore from '@react-native-firebase/firestore';

const instance = firestore().collection('category');

interface Category {
  id: string;
  isDefault: boolean;
  name: string;
  userId?: string;
}

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

const create = async (
  data: any,
  onSuccess: (id: string) => void,
  onFailed: (error: Error) => any,
) => {
  return await instance
    .add({ isDefault: false, ...data })
    .then(ref => onSuccess(ref.id))
    .catch(onFailed);
};

const update = async (
  categoryId: string,
  data: any,
  onSuccess: () => void,
  onFailed: (error: Error) => any,
) => {
  return await instance
    .doc(categoryId)
    .update(data)
    .then(onSuccess)
    .catch(onFailed);
};

const remove = async (
  categoryId: string,
  onSuccess: () => void,
  onFailed: (error: Error) => any,
) => {
  return await instance
    .doc(categoryId)
    .delete()
    .then(() => TaskService.removeAll(categoryId, onSuccess, onFailed))
    .catch(onFailed);
};

export default {
  getAll,
  create,
  update,
  remove,
};
