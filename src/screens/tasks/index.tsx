import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import useStore from '@zustand';

const TaskScreen = () => {
  const photoList = useStore(state => state.photoList);

  return (
    <View style={styles.container}>
      <Text>{photoList.length > 0 ? photoList[0].title : 'No photos'}</Text>
    </View>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
