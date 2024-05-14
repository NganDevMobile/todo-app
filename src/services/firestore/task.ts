import firestore, { firebase } from '@react-native-firebase/firestore';

const instance = firestore().collection('task');

const getAllTasks = async (userId: string) => {
  return new Promise((resolve, reject) => {
    instance
      .where('userId', '==', userId)
      .get()
      .then(querySnapshot => {
        let arr: any[] = [];

        querySnapshot.forEach(snapshot => {
          const { date, ...data } = snapshot.data();

          arr.push({
            ...data,
            date: date.toDate(),
            id: snapshot.id,
          });
        });

        console.log('>>> arr', arr);

        return resolve(arr);
      })
      .catch(reject);
  });
};

const createTask = async (
  data: any,
  onSuccess: (id: string) => void,
  onFailed: (error: Error) => any,
) => {
  return await instance
    .add(data)
    .then(ref => onSuccess(ref.id))
    .catch(onFailed);
};

const update = async (
  taskId: string,
  data: any,
  onSuccess: () => void,
  onFailed: (error: Error) => any,
) => {
  return await instance
    .doc(taskId)
    .update(data)
    .then(onSuccess)
    .catch(onFailed);
};

const remove = async (
  taskId: string,
  onSuccess: () => void,
  onFailed: (error: Error) => any,
) => {
  return await instance.doc(taskId).delete().then(onSuccess).catch(onFailed);
};

const removeAll = async (
  categoryId: string,
  onSuccess: () => void,
  onFailed: (error: Error) => any,
) => {
  const batch = firestore().batch();

  return await instance
    .where('catId', '==', categoryId)
    .get()
    .then(async querySnapshot => {
      querySnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      onSuccess();
    })
    .catch(onFailed);
};

export { getAllTasks };
