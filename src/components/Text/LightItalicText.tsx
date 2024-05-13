import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { CustomTextProps } from './Type';
import { sizeScale } from '@common/Scale';
import { kFontFamily } from '@common/Constants';
import { colors } from 'utils';

const LightItalicText = (props: CustomTextProps) => {
  return (
    <Text
      allowFontScaling={false}
      {...props}
      style={[styles.text, props.style]}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: sizeScale(14),
    fontWeight: '500',
    fontFamily: kFontFamily.LIGHT_ITALIC,
    color: colors.white100Primary,
  },
});

export default LightItalicText;