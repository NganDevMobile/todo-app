import firestore from '@react-native-firebase/firestore';
import { Task } from '@types';

const instance = firestore().collection('task');

export const getAllTasks = async (userId: string) => {
  return new Promise((resolve, reject) => {
    instance
      .where('userId', '==', userId)
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

export const createTask = async (data: Task) => {
  return new Promise((resolve, reject) => {
    instance
      .add(data)
      .then(ref => resolve(ref.id))
      .catch(reject);
  });
};

export const updateTask = async (data: any) => {
  const { id, ...task } = data || {};
  return new Promise((resolve, reject) => {
    instance.doc(id).update(task).then(resolve).catch(reject);
  });
};

export const deleteTask = async (id: string) => {
  return new Promise((resolve, reject) => {
    instance.doc(id).delete().then(resolve).catch(reject);
  });
};

export const deleteAllTasks = async (catId: string) => {
  return new Promise(async (resolve, reject) => {
    const batch = firestore().batch();

    instance
      .where('catId', '==', catId)
      .get()
      .then(async querySnapshot => {
        querySnapshot.forEach(doc => batch.delete(doc.ref));

        await batch.commit();
        resolve();
      })
      .catch(reject);
  });
};
