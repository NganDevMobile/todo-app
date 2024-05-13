import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { CustomTextProps } from './Type';
import { sizeScale } from '@common/Scale';
import { kFontFamily } from '@common/Constants';
import { colors } from 'utils';

const LightText = (props: CustomTextProps) => {
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
    fontWeight: 'bold',
    fontFamily: kFontFamily.LIGHT,
    color: colors.white100Primary,
  },
});

export default LightText;
