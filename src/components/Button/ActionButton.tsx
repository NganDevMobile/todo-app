import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { sizeScale } from '@common/Scale';
import { Icon } from 'react-native-vector-icons/Icon';
import FastImage from 'react-native-fast-image';
import icons from '@theme/icons';
import { colors } from 'utils';

interface AddButtonProps {
  onPress: () => void;
}

const ActionButton = (props: AddButtonProps) => {
  const { onPress } = props || {};
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <FastImage
          source={icons.action}
          style={styles.action}
          resizeMode="stretch"
        />
      </View>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    width: sizeScale(24),
    height: sizeScale(24),
  },
});
