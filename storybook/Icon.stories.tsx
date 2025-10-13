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
  argTypes: {
    size: {
      control: { type: 'text' },
      description: 'Icon size (sets both width and height)',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '1em' }
      }
    },
    width: {
      control: { type: 'text' },
      description: 'Icon width',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '1em' }
      }
    },
    height: {
      control: { type: 'text' },
      description: 'Icon height',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '1em' }
      }
    },
    spin: {
      control: 'boolean',
      description: 'Dynamic rotation icon'
    },
    pulse: {
      control: 'boolean',
      description: 'Use pulse to have it rotate with 8 steps'
    },
    rotate: {
      control: { type: 'number', min: 0, max: 360, step: 15 },
      description: 'Rotate the icon (in degrees)'
    },
    flip: {
      control: { type: 'select' },
      options: [undefined, 'horizontal', 'vertical'],
      description: 'Flip the icon'
    },
    fill: {
      control: 'color',
      description: 'SVG fill color'
    }
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
    size: 200
  }
};

export const SizeWithString: Story = {
  args: {
    size: '4em'
  }
};

export const CustomWidthHeight: Story = {
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
