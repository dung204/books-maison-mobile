import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { View } from 'react-native';

import { Grid, GridItem } from './grid';

type StoryProps = ComponentProps<typeof Grid> & {
  rowGap?: number;
  columnGap?: number;
};

const meta: Meta<StoryProps> = {
  title: 'Grid',
  component: Grid,
  argTypes: {
    numColumns: {
      control: {
        type: 'number',
      },
    },
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

export const Basic: Story = {
  args: {
    numColumns: 12,
    rowGap: 10,
    columnGap: 10,
  },
  render: ({ children, style, rowGap, columnGap, ...args }) => (
    <Grid {...args} style={[style, { rowGap, columnGap }]}>
      <GridItem colSpan={4} style={{ backgroundColor: 'red', height: 50 }} />
      <GridItem colSpan={4} style={{ backgroundColor: 'green', height: 50 }} />
      <GridItem colSpan={4} style={{ backgroundColor: 'purple', height: 50 }} />
      <GridItem colSpan={8} style={{ backgroundColor: 'purple', height: 50 }} />
      <GridItem colSpan={4} style={{ backgroundColor: 'purple', height: 50 }} />
    </Grid>
  ),
};
