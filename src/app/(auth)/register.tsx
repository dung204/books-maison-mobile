import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';

import { type RegisterSchema, registerSchema } from '@/common/types/api/auth';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Grid, GridItem } from '@/components/ui/grid';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

import { AuthNavigationContext } from './_layout';

export default function RegisterScreen() {
  const { setBackCount } = useContext(AuthNavigationContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const [rowGap, setRowGap] = useState(16);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setRowGap(8);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setRowGap(16);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onSubmit = (payload: RegisterSchema) => {
    console.log(payload);
  };

  return (
    <Box className="w-full">
      <Grid
        _extra={{ className: 'grid-cols-2' }}
        rowGap={rowGap}
        columnGap={32}
      >
        <GridItem _extra={{ className: 'col-span-1' }}>
          <FormControl isInvalid={!!errors.firstName}>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <FormControlLabel>
                    <FormControlLabelText>First name</FormControlLabelText>
                    <Text className="ml-2 text-red-500">*</Text>
                  </FormControlLabel>
                  <Input className="my-1">
                    <InputField
                      type="text"
                      placeholder="John"
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
                {errors.email?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </GridItem>
        <GridItem _extra={{ className: 'col-span-1' }}>
          <FormControl isInvalid={!!errors.lastName}>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <FormControlLabel>
                    <FormControlLabelText>Last name</FormControlLabelText>
                    <Text className="ml-2 text-red-500">*</Text>
                  </FormControlLabel>
                  <Input className="my-1">
                    <InputField
                      type="text"
                      placeholder="Doe"
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
                {errors.email?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </GridItem>
        <GridItem _extra={{ className: 'col-span-2' }}>
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
              <FormControlErrorText>
                {errors.email?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </GridItem>
        <GridItem _extra={{ className: 'col-span-2' }}>
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
        </GridItem>
        <GridItem _extra={{ className: 'col-span-2' }}>
          <FormControl isInvalid={!!errors.address}>
            <Controller
              control={control}
              name="address"
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <FormControlLabel>
                    <FormControlLabelText>Address</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="my-1">
                    <InputField
                      type="text"
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
                {errors.email?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </GridItem>
        <GridItem _extra={{ className: 'col-span-2' }}>
          <Button onPress={handleSubmit(onSubmit)}>
            <ButtonText>Register</ButtonText>
          </Button>
        </GridItem>
        <GridItem _extra={{ className: 'col-span-2' }}>
          <Button action="negative">
            <ButtonText>Continue with Google</ButtonText>
          </Button>
        </GridItem>
        <GridItem _extra={{ className: 'col-span-2' }}>
          <Text className="text-center">
            Already had an account?{' '}
            <Link
              href="/login"
              className="text-blue-500 underline"
              onPress={() =>
                setBackCount(prevCount => Math.min(prevCount + 1, 2))
              }
            >
              Login
            </Link>
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
}
