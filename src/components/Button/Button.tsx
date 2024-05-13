import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@/Common/Hooks';
import { sizeScale } from '@/Common/Scale';
import { Colors } from '@/Theme/Variables';
import { BoldText, MediumText, RegularText } from '../Text';
import { ButtonProps } from './Type';
import ExtralBoldText from '../Text/ExtralBoldText';

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

  const { Layout } = useTheme();

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
            ? Colors.disable
            : Colors.primary,
          alignSelf: 'center',
          width: fullSize ? '100%' : 'auto',
          borderWidth: outline ? 2 : 0,
          borderColor: outlineColor || Colors.primary,
          borderRadius: 8,
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
            { color: outline ? outlineColor || Colors.primary : Colors.white },
            textStyle,
          ]}
        >
          {title}
        </MediumText>
      ) : textType === 'bold' ? (
        <BoldText
          style={[
            styles.text,
            { color: outline ? outlineColor || Colors.primary : Colors.white },
            textStyle,
          ]}
        >
          {title}
        </BoldText>
      ) : textType === 'extral-bold' ? (
        <ExtralBoldText
          style={[
            styles.text,
            { color: outline ? outlineColor || Colors.primary : Colors.white },
            textStyle,
          ]}
        >
          {title}
        </ExtralBoldText>
      ) : (
        <RegularText
          style={[
            styles.text,
            { color: outline ? Colors.primary : Colors.white },
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
    paddingHorizontal: sizeScale(16),
    height: sizeScale(50),
  },
  text: {
    marginHorizontal: sizeScale(3),
  },
});
