import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Category, Priority } from '@types';
import { RegularText } from '@components/Text';
import { sizeScale } from '@common/Scale';
import { getByPriority } from 'utils/helper';
import { colors } from 'utils';

interface PropItem {
  id: number;
  name: string;
  selected: boolean;
  onPress: () => void;
}

const PriorityItem = (props: PropItem) => {
  const { name, id, selected, onPress } = props;

  const { bg, text } = getByPriority(id);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tagContainer, selected && { backgroundColor: bg }]}
    >
      <RegularText style={{ color: text }}>{name}</RegularText>
    </TouchableOpacity>
  );
};

export default PriorityItem;

const styles = StyleSheet.create({
  tagContainer: {
    paddingHorizontal: sizeScale(20),
    paddingVertical: sizeScale(6),
    marginRight: sizeScale(6),
    borderRadius: sizeScale(22),
  },
});
