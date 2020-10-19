import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useClassNames } from './utils';

export interface IconBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Dynamic rotation icon */
  spin?: boolean;

  /** Use pulse to have it rotate with 8 steps */
  pulse?: boolean;

  /** Rotate the icon */
  rotate?: number;

  /** View box of the svg */
  viewBox?: string;

  /**
   * You can use a custom element for this component
   */
  as?: React.ElementType;

  /**
   *  Flip the icon
   */
  flip?: 'horizontal' | 'vertical';
}

const propTypes = {
  spin: PropTypes.bool,
  pulse: PropTypes.bool,
  rotate: PropTypes.number,
  viewBox: PropTypes.string
};

const defaultProps = {
  viewBox: '0 0 1024 1024'
};

const IconBase: React.FC<IconBaseProps> = React.forwardRef<HTMLSpanElement, IconBaseProps>(
  (props: IconBaseProps, ref: React.Ref<HTMLSpanElement>) => {
    const {
      spin,
      pulse,
      className,
      rotate,
      children,
      as,
      viewBox,
      tabIndex,
      onClick,
      ...rest
    } = props;
    const [componentClassName, addPrefix] = useClassNames('icon-base');
    const classes = classNames(
      componentClassName,
      {
        [addPrefix('spin')]: spin,
        [addPrefix('pulse')]: pulse
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
      fill: 'currentColor',
      viewBox,
      style: svgStyle
    };

    const renderIcon = () => {
      let Component;
      if (as) {
        Component = as;
        return <Component {...svgProps}>{children}</Component>;
      }

      if (children) {
        return <svg {...svgProps}>{children}</svg>;
      }

      return null;
    };

    let iconTabIndex = tabIndex;
    if (tabIndex === undefined && onClick) {
      iconTabIndex = -1;
    }

    return (
      <span
        {...rest}
        className={classes}
        ref={ref}
        aria-label="img"
        tabIndex={iconTabIndex}
        onClick={onClick}
      >
        {renderIcon()}
      </span>
    );
  }
);

IconBase.displayName = 'IconBase';
IconBase.defaultProps = defaultProps;
IconBase.propTypes = propTypes;

export default IconBase;
