import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { RouterNames } from '@common';
import { useNavigation } from '@react-navigation/native';
import Header from '@components/Header';
import FastImage from 'react-native-fast-image';
import images from '@theme/images';
import { sizeScale } from '@common/Scale';
import { colors } from 'utils';
import { RegularText } from '@components/Text';

const HomeScreen = () => {
  const navigation = useNavigation();

  const addTask = () => {
    navigation.navigate(RouterNames.ADD_SCREEN as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home Page" rightPress={addTask} />

      <View style={styles.container}>
        <FastImage source={images.checklist} style={styles.imgChecklist} />
        <RegularText style={[styles.textWhite, { fontSize: sizeScale(20) }]}>
          What do you want to do today?
        </RegularText>
        <TouchableOpacity onPress={addTask}>
          <RegularText
            style={[
              styles.textWhite,
              {
                fontSize: sizeScale(16),
                marginTop: sizeScale(10),
                color: colors.primary,
              },
            ]}
          >
            Tap + to add your tasks
          </RegularText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgChecklist: {
    width: sizeScale(230),
    height: sizeScale(230),
  },
  textWhite: {
    color: colors.white100Primary,
  },
  modalContainer: {
    flex: 1 / 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
