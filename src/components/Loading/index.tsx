import React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from 'utils';

interface LoadingProps {
  isLoading?: boolean;
}

const Loading = (props: LoadingProps) => {
  const { isLoading } = props || {};

  const styleCenter = {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grayBackground + 50,
    zIndex: 2,
  } as ViewStyle;

  if (!isLoading) return null;

  return (
    <View style={styleCenter}>
      <ActivityIndicator color={colors.primary} size="large" />
    </View>
  );
};

export default Loading;
