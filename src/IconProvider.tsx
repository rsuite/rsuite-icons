import { createContext } from 'react';

export interface IconContextProps {
  classPrefix?: string;
  csp?: {
    /**
     * Content Security Policy nonce
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce
     */
    nonce?: string;
  };

  /**
   * Disable inline styles
   * @default false
   */
  disableInlineStyles?: boolean;
}

export const IconContext = createContext<IconContextProps>({});

export default IconContext.Provider;
