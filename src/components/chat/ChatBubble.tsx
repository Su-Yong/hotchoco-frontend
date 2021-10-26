import { useTheme } from '@/theme';
import className from '@/utils/className';
import style from '@/utils/style';
import { css } from '@linaria/core';
import React, { PropsWithChildren, useMemo } from 'react';
import Typography from '../common/Typography';

const senderStyle = css`
  grid-row: 1;
  grid-column: 2 / span 2;

  .mine > & {
    grid-column: 1 / span 2;
  }
`;

const profileStyle = css`
  grid-row: 1 / span 2;
  grid-column: 1;

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

  &.mine {
    justify-items: end;
    grid-template-columns: 1fr auto 48px;
  }

  &.no-profile::before {
    content: '';
    width: 48px;
    height: 48px;
    grid-row: 2;
    grid-column: 1;
  }
`;

export interface ChatBubbleProps {
  mine?: boolean;
  sender?: JSX.Element;
  profile?: JSX.Element;
  time?: Date;
  readers?: string[]; // TODO: string[] -> User[]
}

const ChatBubble = ({ mine, sender, profile, time, readers, children }: PropsWithChildren<ChatBubbleProps>): JSX.Element => {
  const theme = useTheme();

  const bubbleColor = useMemo(() => mine ? theme.palette.primary : theme.palette.backgroundSecondary, [mine]);

  return (
    <li
      className={className(bubbleStyle, !profile ? 'no-profile' : null, mine ? 'mine' : null)}
      style={style({
        '--bubble-background': bubbleColor.main,
        '--bubble-color': bubbleColor.contrastText,
        '--align': mine ? 'row-reverse' : 'row',
      })}
    >
      <div className={senderStyle}>{sender}</div>
      <div className={profileStyle}>{profile}</div>
      <div className={contentStyle}>{children}</div>
      <div className={infoStyle}>
        <Typography type={'caption1'}>{time?.toLocaleTimeString()}</Typography>
        <Typography type={'caption1'}>{readers?.length ?? 0}</Typography>
      </div>
    </li>
  );
};

export default ChatBubble;
