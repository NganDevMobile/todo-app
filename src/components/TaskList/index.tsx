import RouterName from '@common/RouterName';
import { sizeScale } from '@common/Scale';
import ModalConfirmDeleteTask from '@components/ConfirmDeleteTask';
import ModalTaskAction from '@components/TaskAction';
import ModalTaskStatus from '@components/TaskStatus';
import { RegularText } from '@components/Text';
import { useNavigation } from '@react-navigation/native';
import images from '@theme/images';
import { Task } from '@types';
import useStore from '@zustand';
import { useDeleteTask, useUpdateTask } from 'hooks';
import { useCallback, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors } from 'utils';
import TaskItem from '../TaskItem/index';
import { showError, showSuccess } from 'utils/toast';

interface TaskListProps {
  data: Array<Task>;
  scrollEnabled?: boolean;
  bottomSpace?: number;
  onLoading?: (value: boolean) => void;
}

const TaskList = (props: TaskListProps) => {
  const {
    data = [],
    scrollEnabled = true,
    bottomSpace,
    onLoading = () => {},
  } = props || {};

  const navigation = useNavigation();

  const refModalTaskAction = useRef<any>(null);
  const refModalTaskStatus = useRef<any>(null);
  const refModalDeleteTask = useRef<any>(null);

  const { mutateAsync: requestUpdateTask, isPending: isLoadingUpdateTask } =
    useUpdateTask();
  const { mutateAsync: requestDeleteTask, isPending: isLoadingDeleteTask } =
    useDeleteTask();

  const { deleteTask, updateTask, categories } = useStore();

  const handleDeleteTask = async (id: string) => {
    try {
      await requestDeleteTask(id);
      showSuccess('Task deleted!');
      deleteTask(id);
    } catch (error) {
      showError('Task delete failed!', 'Please try again.');
    }
  };

  const handleChangeTaskStatus = async (id: string, status: string) => {
    try {
      await requestUpdateTask({ id, status });
      updateTask({ id, status });
      showSuccess('Task updated!');
    } catch (error) {
      showError('Task update failed!', 'Please try again.');
    }
  };

  const onSelectTaskAction = (type: string, task: Task) => {
    const { id, status } = task || {};

    switch (type) {
      case 'EDIT':
        navigation.navigate(RouterName.ADD_SCREEN, { item: task });
        break;

      case 'CHANGE_STATUS':
        refModalTaskStatus.current.show(id, status);
        break;

      case 'DELETE':
        refModalDeleteTask.current.show(id);
        break;

      default:
        break;
    }
  };

  const getCategoryName = useCallback(
    (id: string): string => categories.find(e => e.id === id)?.name,
    [categories],
  );

  useEffect(() => {
    onLoading(isLoadingDeleteTask || isLoadingUpdateTask);
  }, [isLoadingDeleteTask, isLoadingUpdateTask]);

  const renderItem = ({ item, index }: { item: Task; index: number }) => {
    const { name, description, status, priority, catId, id } = item || {};

    const onPress = () => {
      navigation.navigate(RouterName.TASK_DETAIL_SCREEN as never, { item });
    };

    const onLongPress = () => {
      refModalTaskAction.current && refModalTaskAction.current.show(item);
    };

    return (
      <TaskItem
        name={name}
        description={description}
        status={status}
        priority={priority}
        index={index}
        onPress={onPress}
        onLongPress={onLongPress}
        categoryName={getCategoryName(catId)}
      />
    );
  };

  const renderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <FastImage source={images.emptyTask} style={styles.emptyTask} />
        <RegularText style={[styles.textEmpty, { marginTop: sizeScale(32) }]}>
          You don't have any schedule today.
        </RegularText>
        <RegularText style={styles.textEmpty}>
          Tap the plus button to create new to-do.
        </RegularText>
      </View>
    );
  };

  return (
    <>
      <FlatList
        keyExtractor={(_, index) => index?.toString()}
        renderItem={renderItem}
        data={data}
        scrollEnabled={scrollEnabled}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={
          !!bottomSpace ? (
            <View style={{ width: '100%', height: bottomSpace }} />
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
      <ModalTaskAction ref={refModalTaskAction} onSelect={onSelectTaskAction} />
      <ModalConfirmDeleteTask
        ref={refModalDeleteTask}
        onDelete={handleDeleteTask}
      />
      <ModalTaskStatus
        ref={refModalTaskStatus}
        onChange={handleChangeTaskStatus}
      />
    </>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  emptyTask: {
    width: sizeScale(200),
    height: sizeScale(200),
  },
  emptyContainer: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textEmpty: {
    color: colors.textEmpty,
  },
});
