import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError, HttpStatusCode } from 'axios';
import { Link } from 'expo-router';
import { CircleCheckIcon } from 'lucide-react-native';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';

import { useAuth, useToast } from '@/common/hooks';
import { asyncStorageService } from '@/common/services';
import { AsyncStorageKey } from '@/common/types';
import { type LoginSchema, loginSchema } from '@/common/types/api/auth';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { authHttpClient } from '@/lib/http';

import { AuthNavigationContext } from './_layout';

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const toast = useToast();

  const { setBackCount, handleGoBack } = useContext(AuthNavigationContext);

  const { authenticate } = useAuth();

  const { mutateAsync: triggerLogin, isPending } = useMutation({
    mutationFn: (payload: LoginSchema) => authHttpClient.login(payload),
    onSuccess: async ({ data }) => {
      await asyncStorageService.set(
        AsyncStorageKey.ACCESS_TOKEN,
        data.accessToken,
      );
      await asyncStorageService.set(
        AsyncStorageKey.REFRESH_TOKEN,
        data.refreshToken,
      );
      await authenticate(true);
      handleGoBack();
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === HttpStatusCode.Unauthorized) {
        toast.error({
          description: 'Invalid email or password',
        });
      }
    },
  });

  const [gap, setGap] = useState(32);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setGap(16);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setGap(32);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onSubmit = async (payload: LoginSchema) => {
    await triggerLogin(payload);
  };

  return (
    <Box className="w-full" style={{ gap }}>
      <FormControl isInvalid={!!errors.email} isDisabled={isPending}>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
                <Text className="ml-2 text-red-500">*</Text>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  type="text"
                  placeholder="email@example.com"
                  autoCapitalize="none"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              </Input>
            </>
          )}
        />
        <FormControlError>
          <FormControlErrorText>{errors.email?.message}</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl isInvalid={!!errors.password} isDisabled={isPending}>
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <FormControlLabel>
                <FormControlLabelText>Password</FormControlLabelText>
                <Text className="ml-2 text-red-500">*</Text>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  type="password"
                  autoCapitalize="none"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              </Input>
            </>
          )}
        />
        <FormControlError>
          <FormControlErrorText>
            {errors.password?.message}
          </FormControlErrorText>
        </FormControlError>
      </FormControl>

      <Button onPress={handleSubmit(onSubmit)} isDisabled={isPending}>
        <ButtonText>Login</ButtonText>
      </Button>
      <Button action="negative" isDisabled={isPending}>
        <ButtonText>Continue with Google</ButtonText>
      </Button>
      <Text className="text-center">
        Don't have an account?{' '}
        <Link
          href="/register"
          className="text-blue-500 underline"
          onPress={() => setBackCount(prevCount => Math.min(prevCount + 1, 2))}
          disabled={isPending}
        >
          Create an account
        </Link>
      </Text>
    </Box>
  );
}
