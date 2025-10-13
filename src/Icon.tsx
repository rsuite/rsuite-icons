import React from 'react';
import classNames from 'classnames';
import { useClassNames, useInsertStyles } from './utils';

export type Flip = 'horizontal' | 'vertical';

export interface IconProps extends React.SVGProps<SVGElement> {
  as?: React.ElementType | string;

  /** Dynamic rotation icon */
  spin?: boolean;

  /** Use pulse to have it rotate with 8 steps */
  pulse?: boolean;

  /** Rotate the icon */
  rotate?: number | string;

  /** View box of the svg */
  viewBox?: string;

  /** Flip the icon */
  flip?: Flip;

  /** Svg fill color */
  fill?: string;

  /** Icon size (sets both width and height) */
  size?: number | string;

  /** Svg width */
  width?: number | string;

  /** Svg height */
  height?: number | string;
}

function filterProps(props: IconProps) {
  const nextProps = {};
  Object.entries(props).forEach(([key, value]: [string, any]) => {
    if (typeof value !== 'undefined') {
      nextProps[key] = value;
    }
  });
  return nextProps;
}

const Icon = React.forwardRef<SVGElement, IconProps>(
  (props: IconProps, ref: React.Ref<SVGElement>) => {
    const {
      as: Component = 'svg',
      spin,
      pulse,
      flip,
      fill = 'currentColor',
      className,
      rotate,
      children,
      viewBox,
      size,
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

    // size prop takes precedence over width/height if provided
    const iconWidth = size ?? width ?? '1em';
    const iconHeight = size ?? height ?? '1em';

    const svgProps = filterProps({
      width: iconWidth,
      height: iconHeight,
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

export default Icon;
