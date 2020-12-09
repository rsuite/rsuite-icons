import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useClassNames, useInsertStyles } from './utils';

export type Flip = 'horizontal' | 'vertical';

export interface IconProps extends React.HTMLAttributes<SVGElement> {
  as?: React.ElementType | string;

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

  /** Svg width */
  width?: number | string;

  /** Svg width */
  height?: number | string;
}

const defaultProps = {
  as: 'svg',
  fill: 'currentColor',
  width: '1em',
  height: '1em'
};

function filterProps(props: IconProps) {
  const nextProps = {};
  Object.entries(props).forEach(([key, value]) => {
    if (typeof value !== 'undefined') {
      nextProps[key] = value;
    }
  });
  return nextProps;
}

const Icon = React.forwardRef<SVGElement, IconProps>(
  (props: IconProps, ref: React.Ref<SVGElement>) => {
    const {
      as: Component,
      spin,
      pulse,
      flip,
      fill,
      className,
      rotate,
      children,
      viewBox,
      width,
      height,
      style,
      ...rest
    } = props;
    const [componentClassName, addPrefix] = useClassNames();
    const classes = classNames(className, componentClassName, {
      [addPrefix('spin')]: spin,
      [addPrefix('pulse')]: pulse,
      [addPrefix(`flip-${flip}`)]: !!flip
    });

    const rotateStyles = {
      msTransform: `rotate(${rotate}deg)`,
      transform: `rotate(${rotate}deg)`
    };

    useInsertStyles();

    const svgProps = filterProps({
      width,
      height,
      fill,
      viewBox,
      className: classes,
      style: rotate ? { ...rotateStyles, ...style } : style
    });

    return (
      <Component aria-hidden focusable={false} ref={ref} {...svgProps} {...rest}>
        {children}
      </Component>
    );
  }
);

Icon.displayName = 'Icon';
Icon.defaultProps = defaultProps;
Icon.propTypes = {
  spin: PropTypes.bool,
  pulse: PropTypes.bool,
  rotate: PropTypes.number,
  viewBox: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  flip: PropTypes.oneOf<Flip>(['horizontal', 'vertical']),
  fill: PropTypes.string
};

export default Icon;
