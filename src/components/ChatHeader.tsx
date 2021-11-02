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

  background: var(--background);
  backdrop-filter: blur(8px);
`;

const iconStyle = css`
  transition: transform 0.25s;

  &:hover {
    transform: translateX(-4px);
  }

  &:active {
    transform: translateX(0) scale(1.25);
  }
`;

export interface ChatHeaderProps {
  chatRoomId: string;
  onBack?: () => void;
}

const ChatHeader = ({ chatRoomId, onBack }: ChatHeaderProps): JSX.Element => {
  const theme = useTheme();

  const background = useMemo(() => ColorUtil.alpha(theme.palette.backgroundSecondary.main, 0.1), [theme]);

  return (
    <div
      className={containerStyle}
      style={style({
        '--background': background,
      })}
    >
      <Typography type={'h4'} onClick={onBack}>
        <Icon icon={ArrowLeft} className={iconStyle} />
      </Typography>
      <Typography type={'h5'}>{chatRoomId}</Typography>
    </div>
  );
};

export default ChatHeader;
