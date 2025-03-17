import type { InterfaceToastProps } from '@gluestack-ui/toast/lib/types';
import {
  CircleCheckBigIcon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
} from 'lucide-react-native';
import {
  type ComponentProps,
  type PropsWithChildren,
  type ReactNode,
  useState,
} from 'react';

import { ToastContext, type ToastFn } from '@/common/contexts';
import { HStack } from '@/components/ui/hstack';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import { VStack } from '@/components/ui/vstack';

type ToastProps = ComponentProps<typeof Toast>;

type ToastProviderProps = Omit<InterfaceToastProps, 'id' | 'render'>;

export function ToastProvider({
  children,
  ...props
}: PropsWithChildren<ToastProviderProps>) {
  const toast = useToast();
  const [toastId, setToastId] = useState('');

  const showToast =
    (
      action: Exclude<ToastProps['action'], undefined>,
      icon?: ReactNode,
    ): ToastFn =>
    ({ variant = 'solid', title, description }) => {
      if (toast.isActive(toastId)) return;

      const newId = Math.random().toString(10);
      setToastId(newId);
      toast.show({
        id: newId,
        placement: 'top',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = `toast-${id}`;
          return (
            <Toast nativeID={uniqueToastId} action={action} variant={variant}>
              <HStack space="md" className="items-center">
                {icon}
                <VStack space="xs">
                  {title && (
                    <ToastTitle className="font-bold">{title}</ToastTitle>
                  )}
                  {description && (
                    <ToastDescription className="flex-row items-center justify-center gap-6">
                      {description}
                    </ToastDescription>
                  )}
                </VStack>
              </HStack>
            </Toast>
          );
        },
        ...props,
      });
    };

  return (
    <ToastContext.Provider
      value={{
        info: showToast('info', <InfoIcon size={16} color="white" />),
        error: showToast('error', <CircleXIcon size={16} color="white" />),
        warning: showToast(
          'warning',
          <TriangleAlertIcon size={16} color="white" />,
        ),
        muted: showToast('muted'),
        success: showToast(
          'success',
          <CircleCheckBigIcon size={16} color="white" />,
        ),
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}
