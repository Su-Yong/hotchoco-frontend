import { useTheme } from '@/theme';
import className from '@/utils/className';
import style from '@/utils/style';
import { css } from '@linaria/core';
import React from 'react';
import Typography from '../common/Typography';

const roomStyle = css`
  width: 100%;

  position: relative;
  display: grid;
  grid-template-columns: 48px 1fr auto;
  grid-template-rows: auto auto;
  align-items: center;
  grid-column-gap: 8px;

  background: var(--background);

  padding: 8px;

  transition: transform 0.25s, background 0.25s;

  &:hover {
    transform: translateX(8px);
    padding-left: 0;
    padding-right: 0;
    background: var(--background);
  }

  &::before {
    content: '';
    width: 16px;
    height: 24px;
    position: absolute;
    background: transparent;

    border-radius: 16px;
    left: -24px;
  }

  &:hover::before {
    background: var(--primary);
  }
`;

const activeRoomStyle = css`
  background: var(--background-second);
`;

const imageStyle = css`
  width: 48px;
  height: 48px;

  grid-row: 1 / 3;

  & > * {
    max-width: 100%;
    max-height: 100%;
  }
`;

const titleStyle = css`
  grid-row: 1 / 2;
  grid-column: 2 / 3;
`;

const descriptionStyle = css`
  grid-row: 2 / 3;
  grid-column: 2 / 3;
`;

const infoStyle = css`
  justify-self: end;
`;

export interface RoomProps {
  name: string;
  description: string;
  image?: JSX.Element;
  info?: string;
  badge?: JSX.Element;

  enabled?: boolean; // TODO: it present disabled room
  actived?: boolean;
}

const Room = ({ name, description, image, info, badge, actived }: RoomProps): JSX.Element => {
  const theme = useTheme();

  return (
    <li
      className={className(roomStyle, actived ? activeRoomStyle : null)}
      style={style({
        '--background': theme.palette.backgroundPrimary.main,
        '--background-second': theme.palette.backgroundSecondary.main,
        '--primary': theme.palette.primary.main,
      })}
    >
      <div className={imageStyle}>{image}</div>
      <Typography type={'h5'} className={titleStyle}>
        {name}
      </Typography>
      <Typography type={'body3'} className={descriptionStyle}>
        {description}
      </Typography>
      <Typography type={'caption1'} className={infoStyle}>
        {info}
      </Typography>
      <div className={infoStyle}>{badge}</div>
    </li>
  );
};

export default Room;
