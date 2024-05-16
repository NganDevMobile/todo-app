import { sizeScale } from '@common/Scale';
import { LightText, RegularText } from '@components/Text';
import { CATEGORY_ACTION } from '@constants/data';
import { Task, TaskAction } from '@types';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { colors } from 'utils';

const ModalCategoryAction = forwardRef(function ModalCategoryAction(
  { onSelect }: any,
  ref,
) {
  const [isVisible, setVisible] = useState(false);
  const [task, setTask] = useState<Task | null>(null);
  const refAction = useRef<string | null>(null);

  const { name } = task || {};

  useImperativeHandle(ref, () => ({
    show: showModal,
    hide: hideModal,
  }));

  const onHideModal = () => {
    refAction.current && onSelect(refAction.current, task);
    refAction.current = null;
  };

  const showModal = (item: Task) => {
    setTask(item);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const renderAction = (item: TaskAction) => {
    const { type, name } = item || {};

    const onPress = () => {
      refAction.current = type;
      hideModal();
    };

    return (
      <TouchableOpacity key={type} style={styles.action} onPress={onPress}>
        <RegularText style={styles.textAction}>{name}</RegularText>
      </TouchableOpacity>
    );
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={hideModal}
      style={styles.modalContainer}
      onModalHide={onHideModal}
    >
      <View style={styles.modalView}>
        <LightText style={styles.title}>{name}</LightText>
        {CATEGORY_ACTION.map(renderAction)}
      </View>
    </ReactNativeModal>
  );
});

export default ModalCategoryAction;

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: sizeScale(20),
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: sizeScale(20),
    justifyContent: 'center',
    paddingTop: sizeScale(20),
    paddingBottom: sizeScale(14),
    paddingHorizontal: sizeScale(25),
  },
  title: {
    fontSize: sizeScale(20),
    textAlign: 'center',
    marginBottom: sizeScale(20),
    color: colors.textPrimary,
  },
  action: {
    marginBottom: sizeScale(16),
  },
  textAction: {
    color: colors.textPrimary,
  },
});
