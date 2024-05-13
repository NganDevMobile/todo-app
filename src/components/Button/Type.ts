import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}
export interface ButtonProps extends TouchableOpacityProps {
  onPress?: any;
  title: string;
  outline?: boolean;
  fullSize?: boolean;
  radius?: number;
  disable?: boolean;
  style?: StyleProp<ViewStyle>;
  iconLeft?: IconProps;
  iconRight?: IconProps;
  textType?: 'regular' | 'medium' | 'bold' | 'extral-bold';
  outlineColor?: string;
  textStyle?: StyleProp<TextStyle>;
}

export interface GradientButtonProps extends ButtonProps {
  colors?: Array<string>;
}
export interface SocialButtonProps extends TouchableOpacityProps {
  type: string;
}
