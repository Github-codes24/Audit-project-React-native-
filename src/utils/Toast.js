import React from 'react';
import Toast from 'react-native-toast-message';

const showToast = (type, text1, text2) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
    text1Style: {
        fontSize: 15, 
        fontWeight: 'bold',
      },
      text2Style: {
        fontSize: 14, 
        color:'gray'
      },
  });
};

const ToastComponent = () => {
  return <Toast innerRef={(ref) => Toast.setRef(ref)} />;
};
const alertSuccess = (text1, text2) => {
  showToast('success', text1, text2);
};

const alertError = (text1, text2) => {
  showToast('error', text1, text2);
};

export { ToastComponent, alertSuccess, alertError };
