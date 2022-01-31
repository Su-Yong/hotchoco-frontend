import { useMemo } from 'react';
import { useTheme } from '@/theme';
import React from 'react';
import style from '@/utils/style';
import { css } from '@linaria/core';
import className from '@/utils/className';

const defaultStyle = css`
  color: var(--th-white-contrastText);
  background: var(--th-white-main);
`;

export interface CSSThemeProviderProps {
  children: JSX.Element;
}

const isNotNullish = (value: unknown) => value !== null && value !== undefined;
// working properly
const pathToKey = (obj: any, parents: string = ''): string[] => {
  const entries = Object.entries(obj);
  const newParents = entries.filter(([_, value]) => isNotNullish(value) && typeof value === 'object').map(([key]) => key);

  const result = entries.filter(([_, value]) => !isNotNullish(value) || typeof value !== 'object').map(([key]) => `${parents}-${key}`);

  return result.concat(newParents.flatMap((parentKey) => pathToKey(obj[parentKey], `${parents}-${parentKey}`)));
};

const CSSThemeProvider = ({ children }: CSSThemeProviderProps): JSX.Element => {
  const nowTheme = useTheme();

  const keys = useMemo(() => pathToKey(nowTheme.palette), [nowTheme]);
  const cssVariables = useMemo(() => {
    const result: Record<string, string> = {};

    keys.forEach((key) => {
      const path = key.split('-').filter((it) => !!it);
      const value = path.reduce((obj: any, p) => obj[p], nowTheme.palette);

      result[`--th${key}`] = value;
    });

    return result;
  }, [nowTheme, keys]);

  return React.cloneElement(children, {
    ...children.props,
    className: className(children.props.className, defaultStyle),
    style: style(cssVariables, children.props.style),
  });
};

export default CSSThemeProvider;
