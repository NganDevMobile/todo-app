import RouterName from '@common/RouterName';
import { sizeScale } from '@common/Scale';
import Loading from '@components/Loading';
import TaskList from '@components/TaskList';
import { LightText, RegularText } from '@components/Text';
import { Layout } from '@theme';
import { Count } from '@types';
import useStore from '@zustand';
import { useStatusTaskCount } from 'hooks';
import { useDateTask } from 'hooks/useTask';
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from 'utils';
import HeaderHome from './HeaderHome';
import TaskStatusItem from './TaskStatusItem';

interface DataType {
  item: Array<Count>;
}

const HomeScreen = ({ navigation }: any) => {
  const user = useStore(state => state.user);

  const { name } = user || {};

  const { leftStatusTasks, rightStatusTasks } = useStatusTaskCount();

  const { dateTasks = [] } = useDateTask();

  const [isLoading, setLoading] = useState(false);

  const onLoading = (value: boolean) => {
    value !== isLoading && setLoading(value);
  };

  const renderItem = ({ item, index }: { item: DataType; index: number }) => {
    return <TaskStatusItem item={item.item} index={index} />;
  };

  const renderTaskByStatus = () => {
    return (
      <View>
        <LightText style={styles.titleMyTask}>My Task</LightText>

        <FlatList
          keyExtractor={(_, index) => index?.toString()}
          renderItem={renderItem}
          data={[{ item: leftStatusTasks }, { item: rightStatusTasks }]}
          horizontal
          scrollEnabled={false}
        />
      </View>
    );
  };

  const renderTaskToday = () => {
    const onPress = () => {
      navigation.navigate(RouterName.STATUS_TASK_SCREEN, {
        status: 'all',
        name: 'All',
      });
    };
    return (
      <>
        <View style={[Layout.rowBetween, { marginTop: sizeScale(32) }]}>
          <LightText style={styles.titleMyTask}>Today Task</LightText>

          {dateTasks.length > 0 && (
            <TouchableOpacity onPress={onPress}>
              <RegularText style={styles.viewAll}>View all</RegularText>
            </TouchableOpacity>
          )}
        </View>
        <TaskList
          data={dateTasks}
          scrollEnabled={false}
          bottomSpace={100}
          onLoading={onLoading}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loading isLoading={isLoading} />
      <HeaderHome name={name} />
      <ScrollView>
        <View style={styles.viewContainer}>
          {renderTaskByStatus()}
          {renderTaskToday()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  viewContainer: {
    flex: 1,
    paddingHorizontal: sizeScale(24),
    backgroundColor: colors.white,
  },
  imgChecklist: {
    width: sizeScale(230),
    height: sizeScale(230),
  },
  textWhite: {
    color: colors.white100Primary,
  },
  modalContainer: {
    flex: 1 / 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  titleMyTask: {
    fontSize: sizeScale(24),
    color: colors.textColor,
  },
  viewAll: {
    color: colors.textColor,
  },
});
