import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Category } from '@types';
import FastImage from 'react-native-fast-image';
import { sizeScale } from '@common/Scale';
import { Layout } from '@theme';
import icons from '@theme/icons';
import { metrics } from 'utils/metrics';
import { colors } from 'utils';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  BoldText,
  LightText,
  MediumText,
  RegularText,
  SemiboldText,
} from '@components/Text';

interface PropItem {
  item: Category;
  index: number;
  onPress: () => void;
  onLongPress: () => void;
}

const CategoryItem = (props: PropItem) => {
  const { item, index, onPress, onLongPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        styles.itemContainer,
        index % 2 === 0 && styles.space,
        { backgroundColor: item.color + '25' },
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        {!!item.icon && (
          <Icon name={item.icon} color={colors.white} size={20} />
        )}
      </View>
      <BoldText style={styles.textName} numberOfLines={1}>
        {item.name}
      </BoldText>
      <RegularText style={styles.textCount} numberOfLines={1}>
        {item.count} Tasks
      </RegularText>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: (metrics.screenWidth - sizeScale(120)) / 2,
    aspectRatio: 1,
    backgroundColor: colors.primary + '25',
    marginTop: sizeScale(16),
    borderRadius: sizeScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: sizeScale(12),
  },
  space: {
    marginRight: sizeScale(26),
  },
  iconContainer: {
    padding: sizeScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 14,
  },
  textName: {},
  textCount: {
    fontSize: sizeScale(12),
  },
});
