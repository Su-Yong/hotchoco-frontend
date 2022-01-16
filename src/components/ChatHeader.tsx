import { useTheme } from '@/theme';
import ColorUtil from '@/utils/Color';
import style from '@/utils/style';
import { css } from '@linaria/core';
import { Icon } from '@iconify/react';
import ArrowLeft from '@iconify/icons-mdi/arrow-left';
import { useMemo } from 'react';
import Typography from './common/Typography';

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

  @media (hover: hover) {
    &:hover {
      transform: translateX(-4px);
    }
  
    &:active {
      transform: translateX(0) scale(1.25);
    }
  }

  @media (hover: none) {
    &:active {
      background: var(--active);
    }
  }
`;

export interface ChatHeaderProps {
  chatRoomId: string;
  onBack?: () => void;
}

const ChatHeader = ({ chatRoomId, onBack }: ChatHeaderProps): JSX.Element => {
  const theme = useTheme();

  const background = useMemo(() => ColorUtil.alpha(theme.palette.backgroundSecondary.main, 0.3), [theme]);
  const active = useMemo(() => ColorUtil.alpha(ColorUtil.darken(theme.palette.backgroundSecondary.main, 0.2), 0.5), [theme]);

  return (
    <div
      className={containerStyle}
      style={style({
        '--background': background,
        '--active': active,
      })}
    >
      <Typography type={'h4'} onClick={onBack} className={centerStyle}>
        <Icon icon={ArrowLeft} className={iconStyle} />
      </Typography>
      <Typography type={'h5'}>{chatRoomId}</Typography>
    </div>
  );
};

export default ChatHeader;
