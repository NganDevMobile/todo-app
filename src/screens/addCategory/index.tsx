import { kHeight, kWidth } from '@common/Constants';
import { sizeScale } from '@common/Scale';
import { Button } from '@components/Button';
import Header from '@components/Header';
import { Input } from '@components/Input';
import { RegularText } from '@components/Text';
import { COLOR_CATEGORY, ICON_LIST } from '@constants/data';
import { Category } from '@types';
import useStore from '@zustand';
import { useCreateCategory, useUpdateCategory } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { colors } from 'utils';
import IconItem from './IconItem';
import ColorItem from './ColorItem';
import icons from '@theme/icons';
import Loading from '@components/Loading';
import { showError, showSuccess } from 'utils/toast';

const AddCategoryScreen = ({ navigation, route }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'all',
  });
  const refCalendar = useRef<any>();

  const [icon, setIcon] = useState<string>('');
  const [color, setColor] = useState<string>('');

  const { mutateAsync: requestCreateCategory, isPending: isLoadingCreate } =
    useCreateCategory();
  const { mutateAsync: requestUpdateCategory, isPending: isLoadingUpdate } =
    useUpdateCategory();

  const { addCategory, updateCategory } = useStore();
  const userId = useStore(state => state.user?.id);

  const { item } = route.params || {};
  const { id } = item || {};

  useEffect(() => {
    initData();
  }, []);

  const initData = () => {
    if (!item) return;

    const { name, color, icon } = item || {};
    setValue('Name', name);
    setIcon(icon);
    setColor(color);
  };

  const onUpdateCategory = async (formData: Category) => {
    await requestUpdateCategory(formData);
    updateCategory(formData);
  };

  const onCreateCategory = async (formData: Category) => {
    const newTaskId = await requestCreateCategory(formData);
    addCategory({ ...formData, id: newTaskId });
  };

  const onSubmit = async (data: any) => {
    try {
      Keyboard.dismiss();

      const { Name } = data || {};

      const formData = { name: Name, icon, color };

      if (!icon) return showError('Please select icon!');
      if (!color) return showError('Please select color!');

      if (id) await onUpdateCategory({ ...formData, id });
      else await onCreateCategory({ ...formData, userId, isDefault: false });
      navigation.goBack();
      showSuccess('Category created');
    } catch (error) {
      showError('Category create failed!', 'Please try again.');
    }
  };

  const renderIconItem = ({
    item: name,
    index,
  }: {
    item: string;
    index: number;
  }) => {
    const selectTags = () => {
      if (name !== icon) setIcon(name);
    };

    return (
      <IconItem
        name={name}
        index={index}
        selected={name === icon}
        onSelect={selectTags}
      />
    );
  };

  const renderIcon = () => {
    return (
      <View>
        <RegularText style={styles.title}>Icon</RegularText>

        <FlatList
          keyExtractor={(_, index) => index?.toString()}
          renderItem={renderIconItem}
          data={ICON_LIST}
          horizontal
          contentContainerStyle={{ marginTop: sizeScale(16) }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  const renderColorItem = ({
    item: colorName,
    index,
  }: {
    item: string;
    index: number;
  }) => {
    const selectTags = () => {
      if (colorName !== color) setColor(colorName);
    };

    return (
      <ColorItem
        color={colorName}
        index={index}
        selected={colorName === color}
        onSelect={selectTags}
      />
    );
  };

  const renderColor = () => {
    return (
      <View style={{ marginTop: sizeScale(20) }}>
        <RegularText style={styles.title}>Color</RegularText>

        <FlatList
          keyExtractor={(_, index) => index?.toString()}
          renderItem={renderColorItem}
          data={COLOR_CATEGORY}
          horizontal
          contentContainerStyle={{ marginTop: sizeScale(16) }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loading isLoading={isLoadingCreate || isLoadingUpdate} />
      <Header
        leftIcon={icons.arrowLeft}
        title={`${id ? 'Update' : 'Create'} Category`}
      />
      <View style={styles.containerAddTask}>
        <Input
          controller={{
            name: 'Name',
            control: control,
            rules: {
              required: {
                value: true,
                message: '',
              },
            },
          }}
          errorText={''}
          placeholder={'Category name'}
          autoCapitalize={'none'}
        />
        {renderIcon()}
        {renderColor()}

        <Button
          onPress={handleSubmit(onSubmit)}
          textType="bold"
          title={id ? 'Update' : 'Create'}
          style={styles.createButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: sizeScale(10),
  },
  inputForm: {},
  inputName: {
    marginTop: sizeScale(16),
  },
  addTask: {
    fontSize: sizeScale(20),
  },
  containerAddTask: {
    flex: 1,
    paddingHorizontal: sizeScale(24),
  },
  modalView: {
    width: '100%',
    minHeight: kHeight / 2,
    maxHeight: kWidth,
    backgroundColor: 'white',
    borderRadius: sizeScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: sizeScale(20),
  },
  title: {
    color: colors.textPrimary,
  },
  textAddNewTags: {
    color: colors.textPrimary,
  },

  buttonAddNewTags: {
    alignItems: 'center',
    marginTop: sizeScale(16),
  },
  createButton: {
    borderRadius: sizeScale(14),
    marginVertical: sizeScale(40),
    width: kWidth - sizeScale(48),
    alignItems: 'center',
  },
});
