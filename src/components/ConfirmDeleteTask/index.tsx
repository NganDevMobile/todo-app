import { sizeScale } from '@common/Scale';
import { Button } from '@components/Button';
import { LightText, RegularText } from '@components/Text';
import { Layout } from '@theme';
import { Task } from '@types';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { colors } from 'utils';

const ModalConfirmDeleteTask = forwardRef(function ModalConfirmDeleteTask(
  { onDelete }: any,
  ref,
) {
  const [isVisible, setVisible] = useState(false);
  const refId = useRef<string | null>(null);
  const refIsSave = useRef<boolean>(false);

  useImperativeHandle(ref, () => ({
    show: showModal,
    hide: hideModal,
  }));

  const showModal = (id: string) => {
    refId.current = id;
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const onHideModal = () => {
    refIsSave.current && onDelete(refId.current);
    refId.current = null;
    refIsSave.current = false;
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={hideModal}
      style={styles.modalContainer}
      onModalHide={onHideModal}
    >
      <View style={styles.modalView}>
        <LightText style={styles.title}>Delete</LightText>
        <RegularText style={styles.textAction}>
          Are you sure to delete this task ?
        </RegularText>

        <View style={Layout.rowBetween}>
          <Button outline textType="bold" title="Cancel" onPress={hideModal} />
          <Button
            style={{ marginLeft: sizeScale(20) }}
            textType="bold"
            title="Sure"
            onPress={() => {
              refIsSave.current = true;
              hideModal();
            }}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
});

export default ModalConfirmDeleteTask;

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
    alignItems: 'center',
    paddingTop: sizeScale(20),
    paddingBottom: sizeScale(30),
    paddingHorizontal: sizeScale(25),
  },
  title: {
    fontSize: sizeScale(20),
    marginBottom: sizeScale(16),
    color: colors.textPrimary,
  },
  textAction: {
    color: colors.textPrimary,
    marginBottom: sizeScale(32),
  },
});
