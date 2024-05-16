import RouterName from '@common/RouterName';
import { sizeScale } from '@common/Scale';
import Header from '@components/Header';
import Loading from '@components/Loading';
import TaskList from '@components/TaskList';
import icons from '@theme/icons';
import { useCategoryTask, useStatusTask } from 'hooks';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { colors } from 'utils';

const CategoryTaskScreen = ({ navigation, route }: any) => {
  const { id, name } = route.params || {};

  const statusTasks = useCategoryTask(id);

  const [isLoading, setLoading] = useState(false);

  const onLoading = (value: boolean) => {
    value !== isLoading && setLoading(value);
  };

  const onPress = () =>
    navigation.navigate(RouterName.ADD_SCREEN, { catId: id });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Loading isLoading={isLoading} />
      <Header
        title={`${name} Tasks`}
        leftIcon={icons.arrowLeft}
        rightIcon={
          <TouchableOpacity style={styles.addButton} onPress={onPress}>
            <IonIcons
              name="add-outline"
              size={24}
              color={colors.white100Primary}
            />
          </TouchableOpacity>
        }
      />
      <View style={styles.container}>
        <TaskList data={statusTasks} onLoading={onLoading} />
      </View>
    </SafeAreaView>
  );
};

export default CategoryTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizeScale(24),
    backgroundColor: colors.white,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeScale(32),
    height: sizeScale(32),
    borderRadius: sizeScale(12),
    backgroundColor: colors.primary,
  },
});
