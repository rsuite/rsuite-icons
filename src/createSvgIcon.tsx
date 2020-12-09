import React from 'react';
import Icon, { IconProps } from './Icon';

interface SvgIconProps {
  as: IconProps['as'];
  ariaLabel?: string;
  displayName?: string;
  category?: string;
}

function createSvgIcon({ as, ariaLabel, displayName, category }: SvgIconProps) {
  const IconComponent = React.forwardRef<SVGElement, IconProps>(
    (props: IconProps, ref: React.Ref<SVGElement>) => (
      <Icon aria-label={ariaLabel} data-category={category} ref={ref} as={as} {...props} />
    )
  );

  IconComponent.displayName = displayName;

  return IconComponent;
}

export default createSvgIcon;
