import firestore from '@react-native-firebase/firestore';
import { deleteAllTasks } from './task';
import useStore from '@zustand';
import { User } from 'types/user';

const instance = firestore().collection('user');

export const getUser = async (id: string) => {
  return new Promise(async (resolve, reject) => {
    const existUser = await instance.doc(id).get();

    const userData = existUser.data();

    if (!userData) {
      const newUserData = {
        name: 'Hieu Ngan',
        email: 'nganlthdevmobile@gmail.com',
      };
      const newUser = await instance.add(newUserData);
      resolve({ ...newUserData, id: newUser.id } as User);
    } else {
      resolve({ ...userData, id });
    }
  });
};
