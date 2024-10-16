import { prefix } from './prefix';
import { useIconContext } from './useIconContext';

export default function useClassNames(): [string, (blockName: string) => string] {
  const { classPrefix } = useIconContext();
  const className = `${classPrefix}icon`;

  return [className, prefix(className)];
}
