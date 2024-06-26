import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { FieldError, UseControllerProps } from 'react-hook-form';

export interface InputProps extends TextInputProps {
  controller: UseControllerProps;
  placeholder?: string;
  errorText?: any;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  editable?: boolean;
  rightPress?: (value?: string) => void;
  iconRight?: Element;
  icon?: {
    name: string;
    size?: number;
    color?: string;
  };
}
