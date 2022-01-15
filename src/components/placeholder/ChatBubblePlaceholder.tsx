import { useTheme } from '@/theme';
import className from '@/utils/className';
import ColorUtil from '@/utils/Color';
import style from '@/utils/style';
import { css } from '@linaria/core';
import React, { useMemo } from 'react';
import Placeholder, { PlaceholderProps } from './Placeholder';

const senderStyle = css`
  width: 60px;
  height: 18px;

  grid-row: 1;
  grid-column: 2 / span 2;

  margin-bottom: 4px;

  .mine > & {
    grid-column: 1 / span 2;
  }
`;

const profileStyle = css`
  width: 48px;
  height: 48px;

  border-radius: 48px;

  grid-row: 1 / span 2;
  grid-column: 1;

  .mine > & {
    grid-column: 3;
  }
`;

const contentStyle = css`
  width: 120px;
  height: 34px;
  
  grid-row: 2;
  grid-column: 2;

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

  padding: 8px;
  padding-top: 0px;

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

export interface ChatBubblePlaceholderProps extends PlaceholderProps {
  mine?: boolean;
}

const ChatBubblePlaceholder = ({
  animationType,
  duration,
}: ChatBubblePlaceholderProps): JSX.Element => {
  const theme = useTheme();

  return (
    <li className={bubbleStyle}>
      <Placeholder animationType={animationType} duration={duration}>
        <div className={senderStyle} />
      </Placeholder>
      <Placeholder animationType={animationType} duration={duration}>
        <div className={profileStyle} />
      </Placeholder>
      <Placeholder animationType={animationType} duration={duration}>
        <div className={contentStyle} />
      </Placeholder>
      <Placeholder animationType={animationType} duration={duration}>
        <div className={infoStyle}>
      </div>
      </Placeholder>
    </li>
  );
};

export default ChatBubblePlaceholder;
