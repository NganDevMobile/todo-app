import { sizeScale } from '@common/Scale';
import { RouterNames } from '@common/index';
import { BoldText, RegularText } from '@components/Text';
import images from '@theme/images';
import useStore from '@zustand';
import { useGetCategories, useGetTasks, useGetUser } from 'hooks';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { User } from 'types/user';
import { colors } from 'utils';
import { showError } from 'utils/toast';

const SplashScreen = ({ navigation }: any) => {
  const { mutateAsync: requestGetUser } = useGetUser();
  const { mutateAsync: requestGetTasks } = useGetTasks();
  const { mutateAsync: requestGetCategories } = useGetCategories();

  const { setUser, setTasks, setCategories } = useStore();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const user = (await requestGetUser('0t4v2nBL8JOLKXEeQufq')) as User;

      const taskList = await requestGetTasks(user?.id);
      const categoryList = await requestGetCategories(user?.id);

      setUser(user);
      setTasks(taskList);
      setCategories(categoryList);

      navigation.replace(RouterNames.BOTTOM_TAB_BAR);
    } catch (error) {
      showError('Get user failed!', 'Please open app again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FastImage style={styles.intro} source={images.intro} />

      <BoldText style={styles.appName}>Tasker</BoldText>
      <RegularText style={styles.content}>
        Plan what you will do to be more organized for today, tomorrow and
        beyond
      </RegularText>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: colors.white,
  },
  intro: {
    width: sizeScale(260),
    height: sizeScale(260),
  },
  appName: {
    fontSize: sizeScale(40),
    fontWeight: '900',
    color: colors.primary,
  },
  content: {
    textAlign: 'center',
    fontWeight: '400',
    color: colors.textContent,
  },
});
