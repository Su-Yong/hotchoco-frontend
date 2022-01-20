import { useTheme } from '@/theme';
import User from '@/types/User';
import className from '@/utils/className';
import ColorUtil from '@/utils/Color';
import style from '@/utils/style';
import { css } from '@linaria/core';
import React, { PropsWithChildren, useMemo } from 'react';
import Typography from '../common/Typography';

const senderStyle = css`
  grid-row: 1;
  grid-column: 2 / span 2;

  margin-bottom: 4px;

  .mine > & {
    grid-column: 1 / span 2;
  }
`;

const profileStyle = css`
  grid-row: 1 / span 2;
  grid-column: 1;

  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  height: 48px;

  .mine > & {
    grid-column: 3;
  }
`;

const contentStyle = css`
  grid-row: 2;
  grid-column: 2;

  background: var(--bubble-background);
  color: var(--bubble-color);
  border: none;
  border-radius: 4px;

  transition: all 0.1s;

  @media (pointer: fine) {
    &:hover {
      box-shadow: 0 0 0 4px var(--bubble-accent) inset;
    }
  }

  &:active {
    background: var(--bubble-accent);
  }
`;

const infoStyle = css`
  grid-row: 2;
  grid-column: 3;

  .mine > & {
    grid-column: 1;
  }

  display: flex;
  flex-flow: var(--align);
  align-items: flex-end;
  gap: 8px;
`;

const bubbleStyle = css`
  display: grid;
  grid-template-columns: 48px auto 1fr;
  grid-template-rows: auto auto;
  justify-items: start;
  align-items: end;
  grid-gap: 4px;
  row-gap: 0;

  padding: 8px;
  padding-top: 0px;

  position: relative;

  &.mine {
    justify-items: end;
    grid-template-columns: 1fr auto 48px;
  }

  &.no-profile::before {
    content: '';
    width: 48px;
    height: 24px;
    grid-row: 2;
    grid-column: 1;
  }

  @media (min-width: 600px) {
    max-width: max(60%, 360px);

    margin-left: var(--left-margin);
  }
`;

export interface ChatBubbleProps {
  mine?: boolean;
  sender?: JSX.Element;
  profile?: JSX.Element;
  time?: Date;
  readers?: User[];
}

const ChatBubble = ({ mine, sender, profile, time, readers, children }: PropsWithChildren<ChatBubbleProps>): JSX.Element => {
  const theme = useTheme();

  const bubbleColor = useMemo(() => (mine ? theme.palette.primary : theme.palette.backgroundSecondary), [mine]);
  const bubbleAccentColor = useMemo(() => ColorUtil.darken(bubbleColor.main, 0.2), [bubbleColor]);
  const blackShadowColor = useMemo(() => ColorUtil.alpha(theme.palette.black.main, 0.1), []);

  return (
    <div
      className={className(bubbleStyle, !profile ? 'no-profile' : null, mine ? 'mine' : null)}
      style={style({
        '--bubble-background': bubbleColor.main,
        '--bubble-accent': bubbleAccentColor,
        '--bubble-color': bubbleColor.contrastText,
        '--align': mine ? 'row-reverse' : 'row',
        '--left-margin': mine ? 'auto' : '0',
        '--black-shadow': blackShadowColor,
      })}
    >
      <div className={senderStyle}>{sender}</div>
      <div className={profileStyle}>{profile}</div>
      <div className={contentStyle}>{children}</div>
      <div className={infoStyle}>
        <Typography type={'caption1'}>{time?.toLocaleTimeString()}</Typography>
        <Typography type={'caption1'}>{readers?.length ?? 0}</Typography>
      </div>
    </div>
  );
};

export default ChatBubble;
