import { JSX } from 'solid-js/jsx-runtime';

const sx = <Element extends HTMLElement>(
  ...styles: JSX.HTMLAttributes<Element>['style'][]
): string => {
  let result: string = '';
  
  styles.forEach((style) => {
    if (!style) return;

    if (typeof style === 'string') {
      result += style;
    } else if (Array.isArray(style)) {
      result += sx(...style);
    } else if (typeof style === 'object') {
      Object.keys(style).forEach((key) => {
        result += `${key}: ${style[key as keyof typeof style]};`;
      });
    }
  });

  return result;
};

export default sx;
