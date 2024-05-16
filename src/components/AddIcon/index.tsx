import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { colors } from 'utils';
import { sizeScale } from '@common/Scale';

interface PropItem {
  onPress: () => void;
  bottom: number;
}

const AddIcon = (item: PropItem) => {
  return (
    <TouchableOpacity
      style={[styles.addButton, { bottom: sizeScale(item.bottom) }]}
      onPress={item.onPress}
    >
      <IonIcons name="add-outline" size={24} color={colors.white100Primary} />
    </TouchableOpacity>
  );
};

export default AddIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizeScale(24),
    backgroundColor: colors.white,
  },
  addButton: {
    position: 'absolute',
    right: sizeScale(24),
    borderRadius: sizeScale(50),
    backgroundColor: colors.primary,
    padding: sizeScale(8),
  },
});
