import classNames from 'classnames';

export const prefix = (pre: string) => (className: string | string[]) => {
  if (!pre || !className) {
    return '';
  }

  if (Array.isArray(className)) {
    return classNames(className.filter(name => !!name).map(name => `${pre}-${name}`));
  }

  return `${pre}-${className}`;
};
