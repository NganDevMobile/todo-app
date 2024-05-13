import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { useController } from 'react-hook-form';
import Octicons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Components
import { RegularText } from '../Text';
// Icon
import { InputProps } from './type';
import Layout from '@theme/layout';
import { colors } from 'utils';
import { sizeScale } from '@common/Scale';
// Theme

const PasswordInput = (props: InputProps) => {
  const {
    controller,
    placeholder,
    inputStyle,
    containerStyle,
    icon,
    errorText,
  } = props;
  const { field } = useController({
    control: controller.control,
    rules: controller.rules,
    defaultValue: '',
    name: controller.name,
  });
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.inputContainer,
          Layout.rowHCenter,
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
          style={[styles.input, inputStyle]}
          secureTextEntry={!isShow}
          value={field.value}
          onChangeText={field.onChange}
          placeholder={placeholder ? placeholder : ''}
          placeholderTextColor={colors.placeHolder}
          {...props}
        />
        <TouchableOpacity onPress={() => setIsShow(prev => !prev)}>
          <Octicons
            name={isShow ? 'eye' : 'eye-closed'}
            size={sizeScale(18)}
            color={colors.primary}
          />
        </TouchableOpacity>
        {!errorText && field.value !== '' && (
          <Icon
            style={{ marginLeft: sizeScale(5) }}
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

export default PasswordInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: sizeScale(18),
  },
  inputContainer: {
    height: sizeScale(40),
    width: '100%',
    borderBottomWidth: 1,
    paddingHorizontal: sizeScale(5),
  },
  input: {
    flex: 1,
    // fontFamily: FONT_FAMILY.REGULAR,
    fontSize: sizeScale(14),
    padding: 0,
    margin: 0,
  },
  error: {
    marginTop: sizeScale(10),
    color: colors.error,
    fontSize: sizeScale(10),
  },
  icon: {
    marginRight: sizeScale(5),
  },
});
