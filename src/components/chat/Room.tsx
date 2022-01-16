import { useTheme } from '@/theme';
import className from '@/utils/className';
import ColorUtil from '@/utils/Color';
import style from '@/utils/style';
import { css } from '@linaria/core';
import React from 'react';
import Typography from '../common/Typography';

const roomStyle = css`
  position: relative;
  display: grid;
  grid-template-columns: 48px 1fr auto;
  grid-template-rows: auto auto;
  align-items: center;
  grid-column-gap: 8px;

  user-select: none;
  cursor: pointer;

  background: var(--background);

  padding: 8px;

  transition: transform 0.25s, background 0.25s, padding-right 0.25s;

  &::before {
    content: '';
    width: 16px;
    height: 24px;
    position: absolute;
    background: transparent;

    border-radius: 16px;
    left: -16px;

    transition: background 0.25s, height 0.25s, left 0.25s;
  }

  @media (hover: hover) {
    &:hover {
      transform: translateX(8px);
      background: var(--background);
    }

    &:hover::before {
      background: var(--primary);
    }
  }

  @media (hover: none) {
    &:active {
      background: var(--pressed-background);
    }
  }
`;

const activeRoomStyle = css`
  @media (hover: hover) {
    transform: translateX(8px);
    padding-right: 16px;

    &::before {
      height: 36px;
      background: var(--primary);
    }
  }

  @media (hover: none) {
    background: var(--pressed-background);

    &::before {
      left: -12px;
      height: 36px;
      background: var(--primary);
    }
  }
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
        '--primary': theme.palette.primary.main,
        '--pressed-background': ColorUtil.darken(theme.palette.backgroundPrimary.main, 0.1),
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
