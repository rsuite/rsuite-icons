import { defaultClassPrefix, prefix } from './prefix';
import classNames from 'classnames';
import { useCallback } from 'react';

export default function useClassNames(
  componentClassName?: string
): [string, (blockName: string) => string] {
  const className = defaultClassPrefix('icon');
  const addPrefix = useCallback(blockClassName => {
    return prefix(className, blockClassName);
  }, []);
  return [classNames(className, defaultClassPrefix(componentClassName)), addPrefix];
}
