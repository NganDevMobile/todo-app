import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BoldText, MediumText, RegularText, SemiboldText } from '../Text';
import { ButtonProps } from './Type';
import { Layout } from '@theme';
import { colors } from 'utils';
import { sizeScale } from '@common/Scale';

export const Button = (props: ButtonProps) => {
  const {
    title,
    outline,
    fullSize,
    disable,
    style,
    iconLeft,
    iconRight,
    onPress,
    textType = 'medium',
    textStyle,
    outlineColor,
  } = props;

  return (
    <TouchableOpacity
      disabled={disable ?? false}
      onPress={onPress}
      style={[
        Layout.center,
        styles.container,
        {
          backgroundColor: outline
            ? 'transparent'
            : disable
            ? colors.disable
            : colors.primary,
          alignSelf: 'center',
          width: fullSize ? '100%' : 'auto',
          borderWidth: outline ? sizeScale(2) : 0,
          borderColor: outlineColor || colors.primary,
          borderRadius: sizeScale(8),
        },
        style,
      ]}
    >
      {iconLeft && (
        <Icon
          name={iconLeft.name}
          size={iconLeft.size}
          color={iconLeft.color}
        />
      )}
      {textType === 'medium' ? (
        <MediumText
          style={[
            styles.text,
            { color: outline ? outlineColor || colors.primary : colors.white },
            textStyle,
          ]}
        >
          {title}
        </MediumText>
      ) : textType === 'bold' ? (
        <BoldText
          style={[
            styles.text,
            { color: outline ? outlineColor || colors.primary : colors.white },
            textStyle,
          ]}
        >
          {title}
        </BoldText>
      ) : textType === 'extral-bold' ? (
        <SemiboldText
          style={[
            styles.text,
            { color: outline ? outlineColor || colors.primary : colors.white },
            textStyle,
          ]}
        >
          {title}
        </SemiboldText>
      ) : (
        <RegularText
          style={[
            styles.text,
            { color: outline ? colors.primary : colors.white },
            textStyle,
          ]}
        >
          {title}
        </RegularText>
      )}

      {iconRight && (
        <Icon
          name={iconRight.name}
          size={iconRight.size}
          color={iconRight.color}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeScale(32),
    paddingVertical: sizeScale(8),
    height: sizeScale(40),
  },
  text: {
    marginHorizontal: sizeScale(3),
  },
});
