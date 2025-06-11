import { useState } from 'react';

export const useToast = () => {
  const [toastConfig, setToastConfig] = useState({
    visible: false,
    type: 'success',
    title: '',
    message: '',
    duration: 3000,
  });

  const showToast = ({ type = 'success', title, message, duration = 3000, onHide }) => {
    setToastConfig({
      visible: true,
      type,
      title,
      message,
      duration,
      onHide,
    });
  };

  const hideToast = () => {
    setToastConfig(prev => ({ ...prev, visible: false }));
    if (toastConfig.onHide) {
      setTimeout(() => {
        toastConfig.onHide();
      }, 200); // Esperar a que termine la animación
    }
  };

  return {
    toastConfig,
    showToast,
    hideToast,
  };
};
