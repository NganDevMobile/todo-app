import Toast from 'react-native-toast-message';

const showSuccess = (text1: string, text2?: string) => {
  Toast.show({
    text1,
    text2,
    type: 'success',
    position: 'bottom',
    visibilityTime: 2000,
  });
};

const showError = (text1: string, text2?: string) => {
  Toast.show({
    text1,
    text2,
    type: 'error',
    position: 'bottom',
    visibilityTime: 2000,
  });
};

export { showSuccess, showError };
