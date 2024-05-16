import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { ReactNode } from 'react';
import FastImage from 'react-native-fast-image';
import { sizeScale } from '@common/Scale';
import {
  BoldText,
  LightText,
  MediumText,
  RegularText,
  SemiboldText,
} from '@components/Text';
import { colors } from 'utils';
import icons from '@theme/icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  leftIcon?: Element;
  title: string;
  rightIcon?: Element;
  leftPress?: () => void;
  rightPress?: () => void;
  customRightIcon?: ReactNode;
}

const Header = (props: HeaderProps) => {
  const { leftIcon, title, rightIcon, rightPress, customRightIcon } = props;

  const navigation = useNavigation();

  const leftPress = () => {
    navigation.goBack();
  };

  const renderRightIcon = (): any => {
    if (customRightIcon) return customRightIcon;
    return rightIcon;
  };

  return (
    <View style={styles.container}>
      <BoldText style={styles.title}>{title}</BoldText>

      <View style={styles.buttonContainer}>
        {leftIcon ? (
          <TouchableOpacity onPress={leftPress}>
            <View style={[styles.iconLeftButton, styles.shadow]}>
              <FastImage
                source={leftIcon}
                style={styles.icon}
                tintColor={colors.textColor}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View />
        )}

        {renderRightIcon()}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: sizeScale(8),
    backgroundColor: colors.white,
    height: 48,
  },
  title: {
    fontSize: sizeScale(20),
    flex: 1,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  icon: {
    width: sizeScale(24),
    height: sizeScale(24),
  },
  iconLeftButton: {
    padding: sizeScale(12),
  },
  shadow: {
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: sizeScale(10),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
});
