import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { sizeScale } from '@common/Scale';
import { RegularText } from '@components/Text';
import { colors } from 'utils';
import IonIcons from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  leftIcon?: Element;
  title: string;
  rightIcon?: Element;
  leftPress?: () => void;
  rightPress?: () => void;
}

const Header = (props: HeaderProps) => {
  const { leftIcon, title, rightIcon, leftPress, rightPress } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={leftPress}>
        <IonIcons name="filter" size={24} color={colors.white100Primary} />
      </TouchableOpacity>
      <RegularText style={styles.title}>{title}</RegularText>
      <TouchableOpacity onPress={rightPress}>
        <IonIcons name="add-outline" size={24} color={colors.white100Primary} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  icon: {
    // width: sizeScale(30),
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.black,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: sizeScale(8),
  },
  title: {
    fontSize: sizeScale(20),
  },
});
