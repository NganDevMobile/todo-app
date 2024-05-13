import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from 'utils';

const CategoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Add</Text>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
});
