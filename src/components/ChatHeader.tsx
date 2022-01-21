import { useTheme } from '@/theme';
import ColorUtil, { Color } from '@/utils/Color';
import style from '@/utils/style';
import { css } from '@linaria/core';
import { Icon } from '@iconify/react';
import ArrowLeft from '@iconify/icons-mdi/arrow-left';
import { useMemo } from 'react';
import Typography from './common/Typography';
import IconButton from './common/IconButton';

const containerStyle = css`
  height: 56px;

  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  flex: 1;
  padding-left: 16px;
  padding-right: 16px;

  user-select: none;

  background: var(--background);
  backdrop-filter: blur(8px);
`;

const centerStyle = css`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
`;

const iconStyle = css`
  cursor: pointer;
  border-radius: 300px;

  transition: transform 0.25s, background 0.25s;

  @media (pointer: fine) {
    &:hover {
      transform: translateX(-4px);
    }

    &:active {
      transform: translateX(0) scale(1.25);
    }
  }

  @media (pointer: coarse), (pointer: none) {
    &:active {
      background: var(--active);
    }
  }
`;

export interface ChatHeaderProps {
  title: string;
  enableBack?: boolean;

  onBack?: () => void;
}

const ChatHeader = ({ title, enableBack = true, onBack }: ChatHeaderProps): JSX.Element => {
  const theme = useTheme();

  const background = useMemo(() => ColorUtil.alpha(theme.palette.backgroundSecondary.main, 0.3), [theme]);
  const active = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.2).alpha(0.5).get(), [theme]);

  return (
    <div
      className={containerStyle}
      style={style({
        '--background': background,
        '--active': active,
      })}
    >
      {enableBack && <IconButton icon={ArrowLeft} onClick={onBack} />}
      <Typography type={'h5'}>{title}</Typography>
    </div>
  );
};

export default ChatHeader;
