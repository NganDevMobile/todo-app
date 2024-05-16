import { StyleSheet, Text, View } from 'react-native';
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { colors } from 'utils';
import ReactNativeModal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';
import { Button } from '@components/Button';
import { sizeScale } from '@common/Scale';
import { Layout } from '@theme';
import { kHeight, kWidth } from '@common/Constants';

const ModalCalendar = forwardRef(function ModalCalendar(
  { onSelect }: any,
  ref,
) {
  const [day, setDay] = useState('');
  const [isVisible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: showCalendar,
    hide: hideCalendar,
  }));

  const onDayPress = ({ dateString }: any) => {
    setDay(dateString);
  };

  const showCalendar = (value: string) => {
    setDay(value);
    setVisible(true);
  };

  const hideCalendar = () => {
    setVisible(false);
  };

  const markedDates = useMemo(
    () => ({
      [day]: {
        selected: true,
        selectedColor: colors.primary,
        color: colors.white,
      },
    }),
    [day],
  );

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={hideCalendar}
      style={styles.modalContainer}
    >
      <View style={styles.modalView}>
        <Calendar
          onDayPress={onDayPress}
          style={{ width: '100%' }}
          theme={{
            textSectionTitleColor: colors.primary,
            selectedDayTextColor: colors.white,
            todayTextColor: colors.primary,
            selectedDayBackgroundColor: colors.primary,
          }}
          markedDates={markedDates}
          initialDate={day}
        />
        <View style={Layout.rowBetween}>
          <Button
            outline
            textType="bold"
            title="Cancel"
            onPress={() => {
              hideCalendar();
            }}
          />
          <Button
            style={{ marginLeft: sizeScale(20) }}
            textType="bold"
            title="Save"
            onPress={() => {
              onSelect(day);
              hideCalendar();
            }}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
});

export default ModalCalendar;

const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    minHeight: kHeight / 2,
    maxHeight: kWidth,
    backgroundColor: 'white',
    borderRadius: sizeScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: sizeScale(20),
  },
});
