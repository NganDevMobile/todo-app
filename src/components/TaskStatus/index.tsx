import { sizeScale } from '@common/Scale';
import { LightText, RegularText } from '@components/Text';
import { TASK_STATUS } from '@constants/data';
import { Task, TaskStatus } from '@types';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { colors } from 'utils';

const ModalTaskStatus = forwardRef(function ModalTaskStatus(
  { onChange }: any,
  ref,
) {
  const [isVisible, setVisible] = useState(false);

  const [status, setStatus] = useState<string | null>(null);

  const refId = useRef<string | null>(null);
  const refStatus = useRef<string | null>(null);

  useImperativeHandle(ref, () => ({
    show: showModal,
    hide: hideModal,
  }));

  const onHideModal = () => {
    if (refStatus.current) onChange(refId.current, refStatus.current);

    refId.current = null;
    refStatus.current = null;
  };

  const showModal = (id: string, status: string) => {
    setStatus(status);
    refId.current = id;
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const renderAction = (item: TaskStatus) => {
    const { type, name, color } = item || {};

    const onPress = () => {
      if (type !== status) refStatus.current = type;
      hideModal();
    };

    return (
      <TouchableOpacity key={type} style={styles.action} onPress={onPress}>
        <RegularText style={[styles.textAction, type == status && { color }]}>
          {name}
        </RegularText>
        <View style={[styles.dot, { backgroundColor: color }]} />
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
        <LightText style={styles.title}>Change Status</LightText>
        {TASK_STATUS.map(renderAction)}
      </View>
    </ReactNativeModal>
  );
});

export default ModalTaskStatus;

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textAction: {
    color: colors.textPrimary,
  },
  dot: {
    width: sizeScale(8),
    height: sizeScale(8),
    borderRadius: sizeScale(8),
  },
});
