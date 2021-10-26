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

  box-shadow: -8px -8px 16px var(--white), 8px 8px 16px var(--black);

  display: flex;
  flex-flow: column;
  justify-contents: center;
  align-items: center;
`;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = ({ children, ...props }: PropsWithChildren<CardProps>): JSX.Element => {
  const theme = useTheme();

  const whiteColor = useMemo(() => ColorUtil.alpha(theme.palette.white.main, 0.3), []);
  const blackColor = useMemo(() => ColorUtil.alpha(theme.palette.black.main, 0.1), []);

  return (
    <div
      {...props}
      className={className(cardStyle, props.className)}
      style={style(
        {
          '--color': theme.palette.backgroundPrimary.contrastText,
          '--background': theme.palette.backgroundPrimary.main,
          '--white': whiteColor,
          '--black': blackColor,
        },
        props.style,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
