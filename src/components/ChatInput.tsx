import { Icon } from '@iconify/react';
import { css } from '@linaria/core';
import AddIcon from '@iconify/icons-mdi/add';
import SendIcon from '@iconify/icons-mdi/send';
import { useTheme } from '@/theme';
import style from '@/utils/style';
import { useCallback, useMemo, useState } from 'react';
import ColorUtil from '@/utils/Color';
import TextareaAutosize from 'react-textarea-autosize';

const containerStyle = css`
  min-height: 56px;

  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: end;

  background: var(--background);
  backdrop-filter: blur(8px);
`;

const buttonStyle = css`
  width: 24px;
  height: 24px;

  padding: 8px;
  margin: 8px;

  border-radius: 24px;

  color: var(--button-color);
  background: var(--button-background);
`;

const textAreaStyle = css`
  min-height: 24px;
  border-radius: 24px;
  line-height: var(--line-height);

  background: var(--input-background);

  margin-top: 8px;
  margin-bottom: 8px;
  padding: 8px;
  padding-left: 16px;
  padding-right: 16px;

  outline: none;
  border: none;

  flex: 1;
`;

const ChatInput = (): JSX.Element => {
  const theme = useTheme();

  const [lineHeight, setLineHeight] = useState<string | number>('auto');

  const onHeightChange = useCallback((rowHeight: number) => {
    setLineHeight(rowHeight <= 24 ? '24px' : 'auto');
  }, []);

  const background = useMemo(() => ColorUtil.alpha(theme.palette.backgroundSecondary.main, 0.5), [theme]);
  const buttonBackground = useMemo(() => ColorUtil.alpha(ColorUtil.darken(theme.palette.backgroundSecondary.main, 0.2), 0.5), [theme]);
  const inputBackground = useMemo(() => ColorUtil.alpha(ColorUtil.darken(theme.palette.backgroundSecondary.main, 0.3), 0.5), [theme]);
  const buttonColor = useMemo(() => theme.palette.backgroundSecondary.main, [theme]);
  const primaryColor = useMemo(() => theme.palette.primary.main, [theme]);
  const primaryText = useMemo(() => theme.palette.primary.contrastText, [theme]);

  return (
    <div
      className={containerStyle}
      style={style({
        '--background': background,
        '--button-background': buttonBackground,
        '--button-color': buttonColor,
        '--input-background': inputBackground,
        '--line-height': lineHeight,
      })}
    >
      <Icon icon={AddIcon} className={buttonStyle} />
      <TextareaAutosize
        maxRows={6}
        className={textAreaStyle}
        onHeightChange={onHeightChange}
      />
      <Icon
        icon={SendIcon}
        className={buttonStyle}
        style={style({
          '--button-background': primaryColor,
          '--button-color': primaryText,
        })}
      />
    </div>
  );
};

export default ChatInput;
