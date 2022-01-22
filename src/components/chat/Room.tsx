import { useTheme } from '@/theme';
import className from '@/utils/className';
import ColorUtil from '@/utils/Color';
import style from '@/utils/style';
import { css } from '@linaria/core';
import React from 'react';
import Typography from '../common/Typography';

const roomStyle = css`
  flex: 1;

  display: flex;
  flex-flow: rows;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  user-select: none;
  cursor: pointer;

  background: var(--background);

  position: relative;
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

  @media (pointer: fine) {
    &:hover {
      transform: translateX(8px);
      background: var(--background);
    }

    &:hover::before {
      background: var(--primary);
    }
  }

  @media (pointer: coarse), (pointer: none) {
    &:active {
      background: var(--pressed-background);
    }
  }
`;

const activeRoomStyle = css`
  @media (pointer: fine) {
    transform: translateX(8px);
    padding-right: 16px;

    &::before {
      height: 36px;
      background: var(--primary);
    }
  }

  @media (pointer: coarse), (pointer: none) {
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

  & > * {
    max-width: 100%;
    max-height: 100%;
  }
`;

const titleStyle = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const descriptionStyle = css`
  flex: 1;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const infoStyle = css`
  justify-self: end;
  width: fit-content;
  white-space: nowrap;
`;

const containerStyle = css`
  flex: 1;
  display: flex;
  flex-flow: column;

  overflow: hidden;
`;

const firstLineStyle = css`
  flex: 1;

  display: flex;
  flex-flow: rows;
  justify-content: center;
  align-items: flex-start;

  gap: 8px;
`;

const secondLineStyle = css`
  flex: 1;

  height: 24px;

  display: flex;
  flex-flow: rows;
  justify-content: center;
  align-items: flex-end;

  gap: 8px;
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
      <div className={containerStyle}>
        <div className={firstLineStyle}>
          <Typography type={'h5'} className={titleStyle}>
            {name}
          </Typography>
          <Typography type={'caption1'} className={infoStyle}>
            {info}
          </Typography>
        </div>
        <div className={secondLineStyle}>
          <Typography type={'body3'} className={descriptionStyle}>
            {description}
          </Typography>
          <div className={infoStyle}>{badge}</div>
        </div>
      </div>
    </li>
  );
};

export default Room;
