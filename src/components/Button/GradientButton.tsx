import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { sizeScale } from '@/Common/Scale';
import { BoldText, MediumText, RegularText } from '../Text';
import { GradientButtonProps } from './Type';
import { Colors } from '@/Theme/Variables';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@/Common/Hooks';

export const GradientButton = (props: GradientButtonProps) => {
  const {
    title,
    fullSize,
    disable,
    style,
    iconLeft,
    iconRight,
    colors,
    onPress,
    textType = 'medium',
    textStyle,
  } = props;

  const { Layout } = useTheme();

  return (
    <TouchableOpacity
      disabled={disable ?? false}
      onPress={onPress}
      style={{ width: fullSize ? '100%' : 'auto' }}
    >
      <LinearGradient
        style={[
          Layout.center,
          styles.container,
          {
            alignSelf: 'center',
            width: fullSize ? '100%' : 'auto',
            borderRadius: 8,
          },
          style,
        ]}
        colors={
          colors ?? [
            disable ? Colors.disable : Colors.primary,
            disable ? Colors.disable : Colors.success,
          ]
        }
        useAngle={true}
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}
      >
        {iconLeft && (
          <Icon
            name={iconLeft.name}
            size={iconLeft.size}
            color={iconLeft.color}
          />
        )}
        {textType === 'medium' ? (
          <MediumText style={[styles.text, textStyle]}>{title}</MediumText>
        ) : textType === 'bold' ? (
          <BoldText style={[styles.text, textStyle]}>{title}</BoldText>
        ) : (
          <RegularText style={[styles.text, textStyle]}>{title}</RegularText>
        )}
        {iconRight && (
          <Icon
            name={iconRight.name}
            size={iconRight.size}
            color={iconRight.color}
          />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: sizeScale(16),
    height: sizeScale(50),
  },
  text: {
    marginHorizontal: sizeScale(3),
    color: Colors.white,
  },
});
