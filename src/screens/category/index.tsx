import RouterName from '@common/RouterName';
import { sizeScale } from '@common/Scale';
import AddIcon from '@components/AddIcon';
import ModalCategoryAction from '@components/CategoryAction';
import ModalConfirmDeleteCategory from '@components/ConfirmDeleteCategory';
import Header from '@components/Header';
import Loading from '@components/Loading';
import { Category } from '@types';
import useStore from '@zustand';
import { useCategoryTaskCount, useDeleteCategory } from 'hooks';
import React, { useRef } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { colors } from 'utils';
import CategoryItem from './CategoryItem';
import { showError, showSuccess } from 'utils/toast';

const CategoryScreen = ({ navigation }: any) => {
  const onPress = () => navigation.navigate(RouterName.ADD_CATEGORY_SCREEN);

  const refModalCategoryAction = useRef<any>(null);
  const refModalDeleteCategory = useRef<any>(null);

  const categoryTaskCount = useCategoryTaskCount();

  const {
    mutateAsync: requestDeleteCategory,
    isPending: isLoadingDeleteCategory,
  } = useDeleteCategory();

  const deleteCategory = useStore(state => state.deleteCategory);

  const handleDeleteCategory = async (id: string) => {
    try {
      await requestDeleteCategory(id);
      showSuccess('Category created');
      deleteCategory(id);
    } catch (error) {
      showError('Category create failed!', 'Please try again.');
    }
  };

  const onSelectCategoryAction = (type: string, category: Category) => {
    const { id } = category || {};

    switch (type) {
      case 'EDIT':
        navigation.navigate(RouterName.ADD_CATEGORY_SCREEN as never, {
          item: category,
        });
        break;

      case 'DELETE':
        refModalDeleteCategory.current.show(id);
        break;

      default:
        break;
    }
  };

  const renderItem = ({ item, index }: { item: Category; index: number }) => {
    const { id, name, isDefault } = item || {};

    const onPress = () => {
      navigation.navigate(RouterName.CATEGORY_TASK_SCREEN, {
        id,
        name,
      });
    };
    const onLongPress = () => {
      if (!isDefault) refModalCategoryAction.current.show(item);
    };

    return (
      <CategoryItem
        onPress={onPress}
        onLongPress={onLongPress}
        item={item}
        index={index}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Header title="Category" />
      <Loading isLoading={isLoadingDeleteCategory} />
      <View style={styles.container}>
        <FlatList
          data={categoryTaskCount}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: sizeScale(16),
            paddingBottom: sizeScale(72),
          }}
        />
      </View>

      <ModalCategoryAction
        ref={refModalCategoryAction}
        onSelect={onSelectCategoryAction}
      />

      <ModalConfirmDeleteCategory
        ref={refModalDeleteCategory}
        onDelete={handleDeleteCategory}
      />

      <AddIcon onPress={onPress} bottom={100} />
    </SafeAreaView>
  );
};

export default CategoryScreen;

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
