import { useContext } from 'react';
import { IconContext } from '../IconProvider';

export function useIconContext() {
  const { classPrefix = 'rs-', csp, disableInlineStyles = false } = useContext(IconContext) || {};

  return {
    classPrefix,
    csp,
    disableInlineStyles
  };
}
