import { kHeight, kWidth } from '@common/Constants';
import { sizeScale } from '@common/Scale';
import { Button } from '@components/Button';
import Header from '@components/Header';
import { Input } from '@components/Input';
import { RegularText } from '@components/Text';
import { Calendar } from '@components/index';
import { DATA_PRIORITY } from '@constants/data';
import icons from '@theme/icons';
import { Category, Priority, Task } from '@types';
import useStore from '@zustand';
import { useCreateTask, useUpdateTask } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from 'utils';
import { getToday } from 'utils/date';
import PriorityItem from './PriorityItem';
import TagsItem from './TagsItem';
import RouterName from '@common/RouterName';
import Loading from '@components/Loading';
import { showError, showSuccess } from 'utils/toast';

const AddScreen = ({ navigation, route }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'all',
  });
  const refCalendar = useRef<any>();

  const [tagId, setTagId] = useState<string>('');
  const [priority, setPriority] = useState<number>(3);
  const { mutateAsync: requestCreateTask, isPending: isLoadingCreate } =
    useCreateTask();
  const { mutateAsync: requestUpdateTask, isPending: isLoadingUpdate } =
    useUpdateTask();

  const { categories, addTask, updateTask } = useStore();
  const userId = useStore(state => state.user?.id);

  const { item, catId: paramCatId, onSuccess = () => {} } = route.params || {};
  const { id } = item || {};

  useEffect(() => {
    initData();
  }, []);

  const initData = () => {
    if (!item) {
      setValue('Date', getToday());
      setTagId(paramCatId);
      return;
    }

    const { name, description, date, priority, catId } = item || {};

    setValue('Date', date);
    setValue('Title', name);
    setValue('Description', description);
    setTagId(catId);
    setPriority(priority);
  };

  const onUpdateTask = async (formData: Task) => {
    await requestUpdateTask(formData);
    updateTask(formData);
    onSuccess(formData);
  };

  const onCreateTask = async (formData: Task) => {
    const newTaskId = await requestCreateTask(formData);
    addTask({ ...formData, id: newTaskId });
  };

  const onSubmit = async (data: any) => {
    try {
      Keyboard.dismiss();

      const { Date, Title, Description } = data || {};

      const formData = {
        date: Date,
        name: Title,
        description: Description,
        catId: tagId,
        priority,
        userId,
        status: 'pending',
      };

      if (!tagId) return showError('Please select tag!');
      if (!priority) return showError('Please select priority!');

      if (id) await onUpdateTask({ ...formData, id });
      else await onCreateTask(formData);

      showSuccess(`Task ${id ? 'updated' : 'created'}`);
      navigation.goBack();
    } catch (error) {
      showError(
        `Task ${id ? 'update' : 'create'} Failed!`,
        'Please try again.',
      );
    }
  };

  const openCalendar = (date?: string) => {
    refCalendar.current && refCalendar.current.show(date);
  };

  const onSelectDate = (dateString: string) => {
    setValue('Date', dateString);
  };

  const onPressAddTag = () => {
    navigation.navigate(RouterName.ADD_CATEGORY_SCREEN);
  };

  const renderTagItem = ({
    item,
    index,
  }: {
    item: Category;
    index: number;
  }) => {
    const { id, name, color } = item || {};

    const selectTags = () => {
      if (id && id !== tagId) setTagId(id);
    };

    return (
      <TagsItem
        id={id}
        name={name}
        color={color}
        index={index}
        selected={id === tagId}
        onSelect={selectTags}
      />
    );
  };

  const renderTags = () => {
    return (
      <View>
        <RegularText style={styles.title}>Tag</RegularText>

        <FlatList
          keyExtractor={(_, index) => index?.toString()}
          renderItem={renderTagItem}
          data={categories}
          horizontal
          contentContainerStyle={{ marginTop: sizeScale(16) }}
          showsHorizontalScrollIndicator={false}
        />

        <TouchableOpacity
          style={styles.buttonAddNewTags}
          onPress={onPressAddTag}
        >
          <RegularText style={styles.textAddNewTags}>+ Add new tag</RegularText>
        </TouchableOpacity>
      </View>
    );
  };

  const renderPriorityItem = ({ item }: { item: Priority; index: number }) => {
    const { name, id } = item || {};

    const selectPriority = () => {
      if (id !== priority) setPriority(id);
    };

    return (
      <PriorityItem
        name={name}
        id={id}
        selected={id === priority}
        onPress={selectPriority}
      />
    );
  };

  const renderPriority = () => {
    return (
      <View style={{ marginTop: sizeScale(20) }}>
        <RegularText style={styles.title}>Priority</RegularText>

        <FlatList
          keyExtractor={(_, index) => index?.toString()}
          renderItem={renderPriorityItem}
          data={DATA_PRIORITY}
          horizontal
          contentContainerStyle={{ marginTop: sizeScale(16) }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={icons.arrowLeft}
        title={`${id ? 'Update' : 'Create'} Task`}
      />
      <Loading isLoading={isLoadingCreate || isLoadingUpdate} />
      <ScrollView contentContainerStyle={styles.containerAddTask}>
        <Input
          controller={{
            name: 'Title',
            control: control,
            rules: {
              required: {
                value: true,
                message: '',
              },
            },
          }}
          errorText={''}
          placeholder={'Task name'}
          autoCapitalize={'none'}
        />
        <Input
          controller={{
            name: 'Date',
            control: control,
            rules: {
              required: {
                value: true,
                message: '',
              },
            },
          }}
          iconRight={icons.calendar}
          errorText={''}
          placeholder={'Date'}
          autoCapitalize={'none'}
          editable={false}
          rightPress={openCalendar}
        />
        <Input
          controller={{
            name: 'Description',
            control: control,
            rules: {
              required: {
                value: true,
                message: '',
              },
            },
          }}
          errorText={''}
          placeholder={'Task description'}
          autoCapitalize={'none'}
        />
        {renderTags()}
        {renderPriority()}
        <Button
          onPress={handleSubmit(onSubmit)}
          textType="bold"
          title={id ? 'Update' : 'Create'}
          style={styles.createButton}
        />
      </ScrollView>

      <Calendar ref={refCalendar} onSelect={onSelectDate} />
    </SafeAreaView>
  );
};

export default AddScreen;

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
