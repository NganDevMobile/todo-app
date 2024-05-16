import RouterName from '@common/RouterName';
import { sizeScale } from '@common/Scale';
import Header from '@components/Header';
import TaskList from '@components/TaskList';
import { AddIcon } from '@components';
import icons from '@theme/icons';
import { useStatusTask } from 'hooks';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from 'utils';
import useStore from '@zustand';
import Loading from '@components/Loading';

const StatusTaskScreen = ({ navigation, route }: any) => {
  const { status, name } = route.params || {};

  const statusTasks = useStatusTask(status);
  const tasks = useStore(state => state.tasks);

  const [isLoading, setLoading] = useState(false);

  const onLoading = (value: boolean) => {
    value !== isLoading && setLoading(value);
  };

  const onPress = () => {
    navigation.navigate(RouterName.ADD_SCREEN);
  };

  const data = status === 'all' ? tasks : statusTasks;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Loading isLoading={isLoading} />
      <Header title={`${name} Tasks`} leftIcon={icons.arrowLeft} />
      <View style={styles.container}>
        <View>
          <TaskList data={data} onLoading={onLoading} />
        </View>
      </View>

      <AddIcon onPress={onPress} bottom={60} />
    </SafeAreaView>
  );
};

export default StatusTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizeScale(24),
    backgroundColor: colors.white,
  },
});
