import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Category } from '@types';
import { RegularText } from '@components/Text';
import { sizeScale } from '@common/Scale';
import { colors as appColors } from 'utils';

interface PropItem {
  id?: string;
  index?: number;
  color?: string;
  name: string;
  onSelect?: () => void;
  selected?: boolean;
  isDisabled?: boolean;
}

const TagsItem = (props: PropItem) => {
  const {
    color = appColors.primary,
    name,
    onSelect,
    selected,
    isDisabled = false,
  } = props;

  return (
    <TouchableOpacity disabled={isDisabled} onPress={onSelect}>
      <View
        style={[
          styles.tagContainer,
          selected && { backgroundColor: color },
          { borderColor: color, borderWidth: 1, margin: 1 },
        ]}
      >
        <RegularText style={{ color: selected ? appColors.white : color }}>
          {name}
        </RegularText>
      </View>
    </TouchableOpacity>
  );
};

export default TagsItem;

const styles = StyleSheet.create({
  tagContainer: {
    paddingHorizontal: sizeScale(20),
    paddingVertical: sizeScale(6),
    marginRight: sizeScale(6),
    borderRadius: sizeScale(22),
  },
});
