import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { sizeScale } from '@common/Scale';
import { Images } from '@theme';

const SplashScreen = () => {
  return (
    <View>
      <FastImage source={Images.intro} style={styles.introImage} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  introImage: {
    width: sizeScale(130),
    height: sizeScale(130),
  },
});
