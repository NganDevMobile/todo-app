import RouterName from '@common/RouterName';
import { sizeScale } from '@common/Scale';
import ActionButton from '@components/Button/ActionButton';
import ModalConfirmDeleteTask from '@components/ConfirmDeleteTask';
import Header from '@components/Header';
import ModalTaskAction from '@components/TaskAction';
import ModalTaskStatus from '@components/TaskStatus';
import { BoldText, RegularText } from '@components/Text';
import { Layout } from '@theme';
import icons from '@theme/icons';
import { Task } from '@types';
import useStore from '@zustand';
import { useDeleteTask, useUpdateTask } from 'hooks';
import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { colors } from 'utils';
import { getByPriority, getColorByStatus } from 'utils/helper';
import { showError, showSuccess } from 'utils/toast';

const TaskDetailScreen = ({ route, navigation }: any) => {
  const { item: routeItem } = route.params || {};

  const [item, setItem] = useState(routeItem);

  const refModalTaskAction = useRef<any>(null);
  const refModalTaskStatus = useRef<any>(null);
  const refModalDeleteTask = useRef<any>(null);

  const { name, description, status, priority, catId, date } = item || {};

  const { deleteTask, updateTask, categories } = useStore();

  const { mutateAsync: requestUpdateTask } = useUpdateTask();
  const { mutateAsync: requestDeleteTask } = useDeleteTask();

  const tagItem = categories.find(e => e.id === catId);
  const priorityItem = getByPriority(priority);
  const statusItem = getColorByStatus(status);

  const handleDeleteTask = async (id: string) => {
    try {
      await requestDeleteTask(id);
      deleteTask(id);
      showSuccess('Task deleted');
      navigation.goBack();
    } catch (error) {
      showError('Task delete failed!', 'Please try again.');
    }
  };

  const handleChangeTaskStatus = async (id: string, status: string) => {
    try {
      await requestUpdateTask({ id, status });
      updateTask({ id, status });
      setItem({ ...item, status });
      showSuccess('Task updated');
    } catch (error) {
      showError('Task update failed!', 'Please try again.');
    }
  };

  const onSelectTaskAction = (type: string, task: Task) => {
    const { id, status } = task || {};

    switch (type) {
      case 'EDIT':
        navigation.navigate(RouterName.ADD_SCREEN, {
          item: task,
          onSuccess: setItem,
        });
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

  const onPressAction = () => {
    refModalTaskAction.current && refModalTaskAction.current.show(item);
  };

  const renderTagIcon = () => {
    if (!tagItem) return null;

    const { name, color } = tagItem || {};
    return (
      <View style={[styles.tagContainer, { backgroundColor: color }]}>
        <RegularText style={{ color: colors.white }}>{name}</RegularText>
      </View>
    );
  };

  const renderPriority = () => {
    if (!priorityItem) return null;

    const { bg, text, title } = priorityItem || {};
    return (
      <View style={[styles.tagContainer, { backgroundColor: bg }]}>
        <RegularText style={{ color: text }}>{title}</RegularText>
      </View>
    );
  };

  const renderStatus = () => {
    if (!statusItem) return null;

    const { bgTag, text } = statusItem || {};
    return (
      <View style={[styles.tagContainer, { backgroundColor: bgTag }]}>
        <RegularText style={{ color: text, textTransform: 'capitalize' }}>
          {status}
        </RegularText>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header
        leftIcon={icons.arrowLeft}
        title="Detail"
        rightIcon={<ActionButton onPress={onPressAction} />}
      />
      <View style={styles.container}>
        <BoldText style={styles.textTitle}>{name}</BoldText>
        <RegularText style={styles.textDescription}>{description}</RegularText>
        <BoldText style={styles.textTitle}>Date</BoldText>
        <RegularText style={styles.textDescription}>{date}</RegularText>
        <BoldText style={styles.textTitle}>Tag</BoldText>
        <View style={[Layout.rowBetween, styles.space]}>
          {renderTagIcon()}
          <View style={Layout.fill} />
        </View>
        <BoldText style={styles.textTitle}>Priority</BoldText>
        <View style={[Layout.rowBetween, styles.space]}>
          {renderPriority()}
          <View style={Layout.fill} />
        </View>
        <BoldText style={styles.textTitle}>Status</BoldText>
        <View style={[Layout.rowBetween, styles.space]}>
          {renderStatus()}
          <View style={Layout.fill} />
        </View>
      </View>
      <ModalTaskAction ref={refModalTaskAction} onSelect={onSelectTaskAction} />
      <ModalConfirmDeleteTask
        ref={refModalDeleteTask}
        onDelete={handleDeleteTask}
      />
      <ModalTaskStatus
        ref={refModalTaskStatus}
        onChange={handleChangeTaskStatus}
      />
    </SafeAreaView>
  );
};

export default TaskDetailScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: sizeScale(24),
  },

  textDescription: {
    //
  },
  textTitle: {
    marginTop: sizeScale(8),
    fontSize: sizeScale(20),
    color: colors.textColor,
  },
  space: {
    marginTop: sizeScale(8),
  },
  tagContainer: {
    paddingHorizontal: sizeScale(20),
    paddingVertical: sizeScale(6),
    marginRight: sizeScale(6),
    borderRadius: sizeScale(22),
  },
});
