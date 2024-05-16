import firestore from '@react-native-firebase/firestore';
import { deleteAllTasks } from './task';

const instance = firestore().collection('category');

export const getAllCategories = async (userId: string) => {
  return new Promise((resolve, reject) => {
    instance
      .where(
        firestore.Filter.or(
          firestore.Filter('userId', '==', userId),
          firestore.Filter('isDefault', '==', true),
        ),
      )
      .get()
      .then(querySnapshot => {
        let arr: any[] = [];

        querySnapshot.forEach(snapshot => {
          arr.push({
            ...snapshot.data(),
            id: snapshot.id,
          });
        });

        return resolve(arr);
      })
      .catch(reject);
  });
};

export const createCategory = async (data: any) => {
  return new Promise((resolve, reject) => {
    instance
      .add({ ...data, isDefault: false })
      .then(ref => resolve(ref.id))
      .catch(reject);
  });
};

export const updateCategory = async (data: any) => {
  const { id, ...category } = data || {};
  return new Promise((resolve, reject) => {
    instance.doc(id).update(category).then(resolve).catch(reject);
  });
};

export const deleteCategory = async (id: string) => {
  return new Promise((resolve, reject) => {
    instance
      .doc(id)
      .delete()
      .then(async () => resolve(deleteAllTasks(id)))
      .catch(reject);
  });
};
