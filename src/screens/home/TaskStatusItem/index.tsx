import { kWidth } from '@common/Constants';
import RouterName from '@common/RouterName';
import { sizeScale } from '@common/Scale';
import { MediumText, RegularText, SemiboldText } from '@components/Text';
import { useNavigation } from '@react-navigation/native';
import { Layout } from '@theme';
import icons from '@theme/icons';
import { Count } from '@types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors } from 'utils';
import { metrics } from 'utils/metrics';

interface PropItem {
  item: Array<Count>;
  index: number;
}

const TaskStatusItem = (props: PropItem) => {
  const navigation = useNavigation();

  const { item } = props;

  const onPress = (status: string, name: string) => {
    navigation.navigate(RouterName.STATUS_TASK_SCREEN, { status, name });
  };

  const renderItem = (item: Count) => {
    const { type, name, countTask, colors, icon } = item || {};

    return (
      <TouchableOpacity
        onPress={() => onPress(type, name)}
        style={[
          styles.longItem,
          {
            backgroundColor: colors,
          },
        ]}
      >
        <View style={Layout.rowSpaceBetween}>
          <FastImage
            source={icon}
            style={
              ['completed', 'doing'].includes(type) ? styles.image : styles.icon
            }
          />
          <FastImage source={icons.arrowRight} style={styles.iconNext} />
        </View>
        <SemiboldText
          style={
            ['completed', 'doing'].includes(type) ? null : styles.textWhite
          }
        >
          {name}
        </SemiboldText>
        <MediumText
          style={
            ['completed', 'doing'].includes(type) ? null : styles.textWhite
          }
        >
          {countTask} task
        </MediumText>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        marginLeft: props.index === 1 ? sizeScale(16) : 0,
        marginTop: sizeScale(16),
      }}
    >
      {renderItem(item[0])}
      {renderItem(item[1])}
    </View>
  );
};

export default TaskStatusItem;

const styles = StyleSheet.create({
  longItem: {
    width: (kWidth - sizeScale(64)) / 2,
    padding: sizeScale(16),
    marginBottom: sizeScale(16),
    borderRadius: sizeScale(14),
    backgroundColor: 'red',
  },
  image: {
    width: sizeScale(92),
    height: sizeScale(69),
  },
  icon: {
    width: sizeScale(28),
    height: sizeScale(28),
  },
  iconNext: {
    width: sizeScale(12),
    height: sizeScale(12),
  },
  space: {
    marginLeft: sizeScale(16),
  },
  textWhite: {
    color: colors.white,
  },
});
