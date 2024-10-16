import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    brand : {
      title: 'React Suite',
      url: 'https://rsuitejs.com' 
    }
  }
};

export default preview;
