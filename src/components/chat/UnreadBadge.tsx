import { useTheme } from '@/theme';
import style from '@/utils/style';
import { css } from '@linaria/core';
import Typography from '../common/Typography';

const badgeStyle = css`
  height: 24px;
  padding-left: 8px;
  padding-right: 8px;

  border-radius: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--text);
  background: var(--red);
`;

export interface UnreadBadgeProps {
  count: number;
}

const UnreadBadge = ({ count }: UnreadBadgeProps): JSX.Element => {
  const theme = useTheme();

  return (
    <div
      className={badgeStyle}
      style={style({
        '--red': theme.palette.red.main,
        '--text': theme.palette.red.contrastText,
      })}
    >
      <Typography type={'caption1'}>
        {Math.min(count, 999)}
        {count > 999 ? '+' : ''}
      </Typography>
    </div>
  );
};

export default UnreadBadge;
