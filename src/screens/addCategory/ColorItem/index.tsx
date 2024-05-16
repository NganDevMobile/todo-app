import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Category } from '@types';
import { RegularText } from '@components/Text';
import { sizeScale } from '@common/Scale';
import { colors as appColors, colors } from 'utils';
import Icon from 'react-native-vector-icons/Feather';

interface PropItem {
  index: number;
  color: string;
  onSelect: () => void;
  selected: boolean;
}

const ColorItem = (props: PropItem) => {
  const { color = colors.primary, onSelect, selected } = props;

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        styles.tagContainer,
        selected && { backgroundColor: color },
        { borderColor: color, borderWidth: 0.5 },
      ]}
    />
  );
};

export default ColorItem;

const styles = StyleSheet.create({
  tagContainer: {
    width: sizeScale(40),
    height: sizeScale(40),
    marginRight: sizeScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizeScale(16),
  },
});
