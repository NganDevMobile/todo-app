import RouterName from '@common/RouterName';
import { sizeScale } from '@common/Scale';
import AddIcon from '@components/AddIcon';
import Header from '@components/Header';
import TaskList from '@components/TaskList';
import useStore from '@zustand';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { colors } from 'utils';

const TaskScreen = ({ navigation }: any) => {
  const tasks = useStore(state => state.tasks);

  const [isLoading, setLoading] = useState(false);

  const onLoading = (value: boolean) => {
    value !== isLoading && setLoading(value);
  };

  const onPress = () => navigation.navigate(RouterName.ADD_SCREEN);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <Header title="All Tasks" />
        <TaskList data={tasks} bottomSpace={100} onLoading={onLoading} />
      </SafeAreaView>
      <AddIcon onPress={onPress} bottom={100} />
    </View>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: sizeScale(24),
  },
});
