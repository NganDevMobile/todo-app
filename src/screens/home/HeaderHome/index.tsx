import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from 'utils';
import { sizeScale } from '@common/Scale';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { LightText, MediumText, RegularText } from '@components/Text';
import { useNavigation } from '@react-navigation/native';
import RouterName from '@common/RouterName';

interface Props {
  name?: string;
}

const HeaderHome = (props: Props) => {
  const { name } = props;
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate(RouterName.ADD_SCREEN as never);
  };
  return (
    <View style={styles.container}>
      <View>
        <LightText style={styles.name}>Hi, {name}</LightText>
        <MediumText style={styles.title}>
          Let's make this day productive
        </MediumText>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <IonIcons name="add-outline" size={24} color={colors.white100Primary} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: sizeScale(24),
  },
  name: {
    fontSize: sizeScale(28),
    color: colors.textColor,
  },
  title: {
    fontSize: sizeScale(14),
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeScale(36),
    height: sizeScale(36),
    borderRadius: sizeScale(12),
    backgroundColor: colors.primary,
  },
});
