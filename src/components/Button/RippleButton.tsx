import { useTheme } from '@/Common/Hooks';
import { sizeScale } from '@/Common/Scale';
import { Colors } from '@/Theme/Variables';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import InkWell from 'react-native-inkwell';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BoldText, MediumText, RegularText } from '../Text';
import { ButtonProps } from './Type';

export const RippleButton = (props: ButtonProps) => {
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
    <View style={{ width: fullSize ? '100%' : 'auto' }}>
      <InkWell
        splashColor={'rgba(255,255,255,0.2)'}
        style={[Layout.fullSize, Layout.fillAbsolute]}
        onTap={onPress}
        enabled={disable ? false : true}
      />
      <View
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
            borderWidth: outline ? 1 : 0,
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
              {
                color: outline ? outlineColor || Colors.primary : Colors.white,
              },
              textStyle,
            ]}
          >
            {title}
          </MediumText>
        ) : textType === 'bold' ? (
          <BoldText
            style={[
              styles.text,
              {
                color: outline ? outlineColor || Colors.primary : Colors.white,
              },
              textStyle,
            ]}
          >
            {title}
          </BoldText>
        ) : (
          <RegularText
            style={[
              styles.text,
              {
                color: outline ? outlineColor || Colors.primary : Colors.white,
              },
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
      </View>
    </View>
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
