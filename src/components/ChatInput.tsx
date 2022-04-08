import { Icon } from '@iconify/react';
import { css } from '@linaria/core';
import AddIcon from '@iconify/icons-mdi/add';
import SendIcon from '@iconify/icons-mdi/send';
import { useTheme } from '@/theme';
import style from '@/utils/style';
import { FormEventHandler, KeyboardEventHandler, useCallback, useMemo, useRef, useState } from 'react';
import ColorUtil, { Color } from '@/utils/Color';
import TextareaAutosize from 'react-textarea-autosize';
import RequestableChat from '@/types/request/RequestableChat';
import className from '@/utils/className';

const containerStyle = css`
  min-height: 56px;

  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: end;

  position: relative;

  &:before {
    content: '';
    position: absolute;
    inset: 0;

    background: var(--background);
    backdrop-filter: blur(8px);
    opacity: 0;
    z-index: 0;

    transition: opacity 0.25s;  
  }

  &[data-empty='false'] {
    &:before {
      opacity: 1;
    }
  }
`;

const buttonStyle = css`
  width: 24px;
  height: 24px;

  padding: 8px;
  margin: 8px;

  border-radius: 24px;

  color: var(--th-primary-contrastText);
  background: var(--th-primary-main);

  z-index: 1;
`;

const textAreaStyle = css`
  min-height: 24px;
  border-radius: 24px;
  line-height: var(--line-height);

  color: var(--input-text);
  background: var(--input-background);
  backdrop-filter: blur(8px);

  margin-top: 8px;
  margin-bottom: 8px;
  padding: 8px;
  padding-left: 16px;
  padding-right: 16px;

  outline: none;
  border: none;

  flex: 1;
  z-index: 1;
`;

const sendStyle = css`
  &[data-empty='true'] {
    margin-right: -40px;
    opacity: 0;
  }

  transition: all 0.25s;
`;

export interface ChatInputProps {
  onFile?: () => void;
  onSubmit?: (chatdata: Omit<RequestableChat<unknown>, 'sender' | 'room'>) => boolean;
}

const ChatInput = ({ onFile, onSubmit }: ChatInputProps): JSX.Element => {
  const theme = useTheme();

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [lineHeight, setLineHeight] = useState<string | number>('auto');
  const [isEmpty, setIsEmpty] = useState(true);

  const onHeightChange = useCallback((rowHeight: number) => {
    setLineHeight(rowHeight <= 24 ? '24px' : 'auto');
  }, []);

  const onClickSend = useCallback(() => {
    if (!inputRef.current) return;
    const value = inputRef.current.value;

    if (value.trim()) {
      const result = onSubmit?.({
        content: value,
      });

      if (result) {
        inputRef.current.value = '';
        inputRef.current.focus();
        setIsEmpty(true);
      }
    }
  }, [inputRef, onSubmit]);

  const onInput: FormEventHandler<HTMLTextAreaElement> = useCallback((event) => {
    if (isEmpty && event.currentTarget.value.trim().length > 0) setIsEmpty(false);
    else if (!isEmpty && event.currentTarget.value.trim().length === 0) setIsEmpty(true);
  }, [isEmpty]);

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback((event) => {
    if (event.key === 'Enter') {
      if (!event.shiftKey)  {
        event.preventDefault();
        onClickSend();
      }
    }
  }, [onClickSend]);

  const background = useMemo(() => ColorUtil.alpha(theme.palette.backgroundSecondary.main, 0.5), [theme]);
  const buttonBackground = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.5).alpha(0.5).get(), [theme]);
  const inputBackground = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.2).alpha(0.5).get(), [theme]);
  const inputText = useMemo(() => theme.palette.backgroundSecondary.contrastText, [theme]);

  return (
    <div
      className={containerStyle}
      data-empty={isEmpty}
      style={style({
        '--background': background,
        '--button-background': buttonBackground,
        '--input-background': inputBackground,
        '--input-text': inputText,
        '--line-height': lineHeight,
      })}
    >
      <Icon icon={AddIcon} className={buttonStyle} onClick={onFile} />
      <TextareaAutosize
        ref={inputRef}
        maxRows={6}
        className={textAreaStyle}
        onHeightChange={onHeightChange}
        onInput={onInput}
        onKeyDown={onKeyDown}
      />
      <Icon
        data-empty={isEmpty}
        icon={SendIcon}
        className={className(buttonStyle, sendStyle)}
        onClick={onClickSend}
      />
    </div>
  );
};

export default ChatInput;
