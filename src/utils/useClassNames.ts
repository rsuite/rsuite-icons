import { defaultClassPrefix, prefix } from './prefix';
import { useCallback } from 'react';

export default function useClassNames(componentClassName): [string, (blockName: string) => string] {
  const className = defaultClassPrefix(componentClassName);
  const addPrefix = useCallback(
    blockClassName => {
      return prefix(className, blockClassName);
    },
    [className]
  );
  return [defaultClassPrefix(componentClassName), addPrefix];
}
