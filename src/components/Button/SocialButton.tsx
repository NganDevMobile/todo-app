import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MediumText } from '../Text';
import { SocialButtonProps } from './Type';
import { Layout } from '@theme';
import { sizeScale } from '@common/Scale';
import { colors } from 'utils';

export const SocialButton = (props: SocialButtonProps) => {
  const { style, type, onPress } = props;

  return (
    <TouchableOpacity
      style={[
        Layout.rowCenter,
        styles.container,
        { backgroundColor: type === 'google' ? '#DC4B38' : '#3B5999' },
        style,
      ]}
      onPress={onPress}
    >
      <FontAwesome
        name={type === 'google' ? 'google' : 'facebook'}
        size={sizeScale(18)}
        color={colors.white}
        style={styles.icon}
      />
      <MediumText style={styles.text}>
        {type === 'google' ? 'Google' : 'Facebook'}
      </MediumText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizeScale(16),
    height: sizeScale(50),
    borderRadius: sizeScale(8),
  },
  text: {
    color: colors.white,
  },
  icon: {
    marginRight: sizeScale(8),
  },
});
