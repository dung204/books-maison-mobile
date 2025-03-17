import { useContext } from 'react';

import { ToastContext } from '@/common/contexts';

export function useToast() {
  const toast = useContext(ToastContext);

  if (!toast) {
    throw new Error('useToast must be used inside ToastContext.');
  }

  return toast;
}
