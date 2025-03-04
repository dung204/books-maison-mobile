import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';

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

import { AuthNavigationContext } from './_layout';

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { setBackCount } = useContext(AuthNavigationContext);
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

  const onSubmit = (payload: LoginSchema) => {
    console.log(payload);
  };

  return (
    <Box className="w-full" style={{ gap }}>
      <FormControl isInvalid={!!errors.email}>
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

      <FormControl isInvalid={!!errors.password}>
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

      <Button onPress={handleSubmit(onSubmit)}>
        <ButtonText>Login</ButtonText>
      </Button>
      <Button action="negative">
        <ButtonText>Continue with Google</ButtonText>
      </Button>
      <Text className="text-center">
        Don't have an account?{' '}
        <Link
          href="/register"
          className="text-blue-500 underline"
          onPress={() => setBackCount(prevCount => Math.min(prevCount + 1, 2))}
        >
          Create an account
        </Link>
      </Text>
    </Box>
  );
}
