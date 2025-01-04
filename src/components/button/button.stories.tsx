import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  args: {
    text: 'Hello world',
    onPress: action('onPress'),
    onLongPress: action('onLongPress'),
  },
  decorators: [
    Comp => (
      <View style={{ padding: 16, alignItems: 'flex-start' }}>
        <Comp />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const AnotherExample: Story = {
  args: {
    text: 'Another example',
  },
};
