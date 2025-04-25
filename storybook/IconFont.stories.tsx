import type { Meta, StoryObj } from '@storybook/react';

import createIconFont from '../src/createIconFont';

const IconFont = createIconFont({
  scriptUrl: '//at.alicdn.com/t/font_2120285_ve2eozz092d.js',
  commonProps: { style: { fontSize: 30, color: '#1675e0' } }
});

const meta: Meta<typeof IconFont> = {
  title: 'Example/IconFont',
  component: IconFont,
  parameters: {
    layout: 'centered'
  },
  args: {
    width: '2em',
    height: '2em',
    icon: 'rs-upload'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof IconFont>;

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
