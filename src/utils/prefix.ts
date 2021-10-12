import curry from 'lodash/curry';
import classNames from 'classnames';

export const globalKey = 'rs-';
export const getClassNamePrefix = () => {
  return globalKey;
};
export const defaultClassPrefix = (name: string) =>
  name ? `${getClassNamePrefix()}${name}` : undefined;

export const prefix = curry((pre: string, className: string | string[]) => {
  if (!pre || !className) {
    return '';
  }

  if (Array.isArray(className)) {
    return classNames(className.filter(name => !!name).map(name => `${pre}-${name}`));
  }

  return `${pre}-${className}`;
});
