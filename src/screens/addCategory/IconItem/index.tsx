import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Category } from '@types';
import { RegularText } from '@components/Text';
import { sizeScale } from '@common/Scale';
import { colors as appColors, colors } from 'utils';
import Icon from 'react-native-vector-icons/Ionicons';

interface PropItem {
  index: number;
  name: string;
  onSelect: () => void;
  selected: boolean;
}

const IconItem = (props: PropItem) => {
  const { name, onSelect, selected } = props;

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        styles.tagContainer,
        selected && { backgroundColor: colors.primary },
        { borderColor: colors.primary, borderWidth: 0.5 },
      ]}
    >
      <Icon
        name={name}
        size={16}
        color={selected ? colors.white : colors.primary}
      />
    </TouchableOpacity>
  );
};

export default IconItem;

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
