import { HTMLAttributes, PropsWithChildren, useMemo } from 'react';
import { css } from '@linaria/core';

import { useTheme } from '@/theme';
import className from '@/utils/className';
import style from '@/utils/style';
import ColorUtil from '@/utils/Color';

const cardStyle = css`
  padding: 8px;
  border-radius: 8px;

  color: var(--color);
  background: var(--background);

  border: solid 2px var(--border-color);

  display: flex;
  flex-flow: column;
  justify-contents: center;
  align-items: center;
`;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = ({ children, ...props }: PropsWithChildren<CardProps>): JSX.Element => {
  const theme = useTheme();

  const borderColor = useMemo(() => ColorUtil.alpha(theme.palette.backgroundSecondary.main, 0.3), []);

  return (
    <div
      {...props}
      className={className(cardStyle, props.className)}
      style={style(
        {
          '--color': theme.palette.backgroundPrimary.contrastText,
          '--background': theme.palette.backgroundPrimary.main,
          '--border-color': borderColor,
        },
        props.style,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
