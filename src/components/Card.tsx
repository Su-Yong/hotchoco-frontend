import { HTMLAttributes, PropsWithChildren, useMemo } from 'react';
import rgba from 'color-rgba';
import { css } from '@linaria/core';

import { useTheme } from '../theme';
import className from '../utils/className';
import style from '../utils/style';

const cardStyle = css`
  padding: 8px;
  border-radius: 8px;

  display: flex;
  flex-flow: column;
  justify-contents: center;
  align-items: center;
`;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = ({ children, ...props }: PropsWithChildren<CardProps>): JSX.Element => {
  const theme = useTheme();

  const shadowColor = useMemo(() => {
    const color = rgba(theme.palette.black.main);

    if (color) {
      const [r, g, b] = color;

      return `rgba(${r}, ${g}, ${b}, 0.3)`;
    }

    return `rgba(45, 45, 45, 0.3)`;
  }, []);

  return (
    <div
      {...props}
      className={className(cardStyle, props.className)}
      style={style(
        {
          color: theme.palette.backgroundPrimary.contrastText,
          background: theme.palette.backgroundPrimary.main,
          boxShadow: `0px 2px 6px ${shadowColor}`,
        },
        props.style,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
