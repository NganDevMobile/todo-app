import { StyleSheet, SafeAreaView, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from 'utils';
import { BoldText } from '@components/Text';
import Header from '@components/Header';
import { sizeScale } from '@common/Scale';
import { Input } from '@components/Input';
import { useForm } from 'react-hook-form';

const AddScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
  });
  const [name, setName] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contain}>
        <BoldText style={styles.addTask}>Add task</BoldText>
        <Input
          icon={{ name: 'person-outline' }}
          controller={{
            name: 'username',
            control: control,
            rules: {
              required: {
                value: true,
                message: '',
              },
              validate: value => value.length >= 6 || `${'validation.min'}`,
            },
          }}
          errorText={''}
          placeholder={'Do math homework'}
          autoCapitalize={'none'}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingHorizontal: sizeScale(10),
  },
  contain: {
    // backgroundColor: colors.gray,
  },
  addTask: {
    fontSize: sizeScale(20),
    marginHorizontal: 20,
  },
});
