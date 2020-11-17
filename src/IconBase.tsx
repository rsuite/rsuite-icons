import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useClassNames, useInsertStyles } from './utils';

type Flip = 'horizontal' | 'vertical';

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Dynamic rotation icon */
  spin?: boolean;

  /** Use pulse to have it rotate with 8 steps */
  pulse?: boolean;

  /** Rotate the icon */
  rotate?: number;

  /** View box of the svg */
  viewBox?: string;

  /** Flip the icon */
  flip?: Flip;

  /** Svg fill color */
  fill?: string;
}

export interface IconBaseProps extends IconProps {
  /** You can use a custom element for this component */
  as?: React.ElementType | string;

  /**
   * Component base class Name
   * @default icon-base
   * */
  baseClassName?: string;
}

export const propTypes = {
  spin: PropTypes.bool,
  pulse: PropTypes.bool,
  rotate: PropTypes.number,
  viewBox: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  flip: PropTypes.oneOf<Flip>(['horizontal', 'vertical']),
  fill: PropTypes.string
};

export const defaultProps = {
  viewBox: '0 0 1024 1024',
  baseClassName: 'icon-base',
  fill: 'currentColor'
};

const IconBase = forwardRef<HTMLSpanElement, IconBaseProps>(
  (props: IconBaseProps, ref: React.Ref<HTMLSpanElement>) => {
    const {
      spin,
      pulse,
      flip,
      fill,
      className,
      rotate,
      children,
      as,
      viewBox,
      tabIndex,
      onClick,
      baseClassName,
      ...rest
    } = props;
    const [componentClassName, addPrefix] = useClassNames(baseClassName);
    const classes = classNames(
      componentClassName,
      {
        [addPrefix('spin')]: spin,
        [addPrefix('pulse')]: pulse,
        [addPrefix(`flip-${flip}`)]: !!flip
      },
      className
    );

    const svgStyle = rotate
      ? {
          msTransform: `rotate(${rotate}deg)`,
          transform: `rotate(${rotate}deg)`
        }
      : undefined;

    const svgProps = {
      width: '1em',
      height: '1em',
      fill,
      viewBox,
      style: svgStyle
    };

    const renderIcon = () => {
      let Component: React.ElementType | string;
      if (as) {
        Component = as;
      }

      if (children) {
        Component = 'svg';
      }

      if (Component) {
        return <Component {...svgProps}>{children}</Component>;
      }

      return null;
    };

    let iconTabIndex = tabIndex;
    if (tabIndex === undefined && onClick) {
      iconTabIndex = -1;
    }

    useInsertStyles();

    return (
      <span {...rest} className={classes} ref={ref} tabIndex={iconTabIndex} onClick={onClick}>
        {renderIcon()}
      </span>
    );
  }
);

IconBase.displayName = 'IconBase';
IconBase.defaultProps = defaultProps;
IconBase.propTypes = propTypes;

export default IconBase;

export function createSvgIcon({
  as,
  ariaLabel,
  displayName,
  category
}: {
  as: IconBaseProps['as'];
  ariaLabel: string;
  displayName: string;
  category: string;
}) {
  const IconComponent: FC<IconProps> = forwardRef<HTMLSpanElement, IconProps>(
    function IconComponent(props: IconProps, ref: React.Ref<HTMLSpanElement>) {
      return (
        <IconBase
          aria-label={ariaLabel}
          role="img"
          data-category={category}
          {...props}
          ref={ref}
          as={as}
        />
      );
    }
  );

  IconComponent.displayName = displayName;
  IconComponent.propTypes = propTypes;
  IconComponent.defaultProps = defaultProps;

  return IconComponent;
}
