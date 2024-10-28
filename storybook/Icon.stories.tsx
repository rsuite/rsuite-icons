import type { Meta, StoryObj } from '@storybook/react';

import Icon from '../src/react/Explore';

const meta: Meta<typeof Icon> = {
  title: 'Example/Icon',
  component: Icon,
  parameters: {
    layout: 'centered'
  },
  args: {
    width: '2em',
    height: '2em'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Spin: Story = {
  args: {
    spin: true
  }
};

export const Pulse: Story = {
  args: {
    pulse: true
  }
};

export const Rotate: Story = {
  args: {
    rotate: 45
  }
};

export const Flip: Story = {
  args: {
    flip: 'horizontal'
  }
};

export const Size: Story = {
  args: {
    width: 200,
    height: 200
  }
};

export const Color: Story = {
  args: {
    fill: 'red'
  }
};
