import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { ArrowLeftIcon } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, TouchableHighlight } from 'react-native';

import { type LoginSchema, loginSchema } from '@/common/types/api/auth';
import { AppLogo } from '@/components/ui/app-logo';
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

export default function LoginScreen() {
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

  return (
    <Box className="flex-1 flex-col bg-white">
      <Box className="basis-[60] flex-row items-center px-[14]">
        <TouchableHighlight
          underlayColor="#DDDDDD"
          onPress={() => router.back()}
          className="rounded-full p-[6]"
        >
          <ArrowLeftIcon color="black" size={24} />
        </TouchableHighlight>
      </Box>
      <Box className="flex-1 flex-col items-center justify-around px-[16]">
        <Box className="flex-col items-center" style={{ gap }}>
          <AppLogo className="scale-75" />
          <Text className="text-3xl font-extralight">
            Login to Books Maison
          </Text>
        </Box>
        <LoginForm />
        <Text className="text-center text-sm">
          Your continued use of this application means you agree to our terms of
          use
        </Text>
      </Box>
    </Box>
  );
}

function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
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
        <Link href="/register" className="text-blue-500 underline">
          Create an account
        </Link>
      </Text>
    </Box>
  );
}
