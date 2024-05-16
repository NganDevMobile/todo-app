import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { useController } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from 'utils';
import { sizeScale } from '@common/Scale';
import { RegularText } from '@components/Text';
import Layout from '@theme/layout';
import { InputProps } from './type';
import FastImage from 'react-native-fast-image';

const Input = (props: InputProps) => {
  const {
    controller,
    placeholder,
    containerStyle,
    inputStyle,
    errorText,
    iconRight,
    rightPress,
    editable,
    icon,
  } = props;
  const { field } = useController({
    control: controller.control,
    rules: controller.rules,
    defaultValue: '',
    name: controller.name,
  });

  const handlePressRight = () => {
    rightPress && rightPress(field?.value ?? '');
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {controller.name && (
        <RegularText style={styles.title}>{controller.name}</RegularText>
      )}
      <View
        style={[
          styles.inputContainer,
          Layout.rowBetween,
          {
            borderColor: errorText
              ? colors.error
              : field.value !== ''
              ? colors.primary
              : colors.placeHolder,
          },
        ]}
      >
        {icon && (
          <View
            style={[
              styles.icon,
              Layout.center,
              {
                width: sizeScale((icon.size ?? 22) + 8),
              },
            ]}
          >
            <Icon
              name={icon.name}
              size={icon.size ?? sizeScale(22)}
              color={icon.color ?? colors.primary}
            />
          </View>
        )}
        <TextInput
          editable={editable}
          style={[styles.input, inputStyle]}
          value={field.value}
          onChangeText={field.onChange}
          placeholder={placeholder ?? ''}
          placeholderTextColor={colors.textGray}
          {...props}
        />

        {iconRight && (
          <TouchableOpacity onPress={handlePressRight}>
            <FastImage source={iconRight} style={styles.iconRight} />
          </TouchableOpacity>
        )}

        {!errorText && field.value !== '' && (
          <Icon
            style={styles.icon}
            name={'done'}
            size={sizeScale(20)}
            color={colors.primary}
          />
        )}
      </View>
      {errorText && <RegularText style={styles.error}>{errorText}</RegularText>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: sizeScale(18),
  },
  inputContainer: {
    height: sizeScale(40),
    width: '100%',
    borderBottomWidth: 1,
    borderRadius: sizeScale(4),
    borderBottomColor: colors.border,
  },
  input: {
    flex: 1,
    fontWeight: '500',
    fontSize: sizeScale(14),
    padding: 0,
    margin: 0,
    color: colors.textColor,
  },
  error: {
    marginTop: sizeScale(10),
    color: colors.error,
    fontSize: sizeScale(10),
  },
  icon: {
    marginRight: sizeScale(5),
  },
  title: {
    color: colors.textPrimary,
  },
  iconRight: {
    width: sizeScale(20),
    height: sizeScale(20),
  },
});
