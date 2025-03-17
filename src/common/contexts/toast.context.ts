import { type ComponentProps, type ReactNode, createContext } from 'react';

import type { Toast } from '@/components/ui/toast';

type ToastProps = ComponentProps<typeof Toast>;

export type ToastFn = (props: {
  variant?: ToastProps['variant'];
  title?: ReactNode;
  description?: ReactNode;
}) => void;

type ToastContextValue = {
  [fn in Exclude<ToastProps['action'], undefined>]: ToastFn;
};

export const ToastContext = createContext<ToastContextValue | null>(null);
