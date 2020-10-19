import React from 'react';
import { defaultProps, propTypes, default as IconBase, IconBaseProps } from './IconBase';
import { IconFontProps } from './IconFont';

type IconProps = Omit<IconBaseProps, 'baseClassName'>;

const Icon: React.FC<IconProps> = React.forwardRef<HTMLSpanElement, IconFontProps>(function Icon(
  props: IconProps,
  ref: React.Ref<HTMLSpanElement>
) {
  return <IconBase {...props} baseClassName="icon" ref={ref} />;
});

IconBase.displayName = 'Icon';
Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
