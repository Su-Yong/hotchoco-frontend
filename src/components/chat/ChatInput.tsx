import { getTheme, variable } from '@/theme';
import { css } from '@linaria/core';
import { Component, createSignal, onMount } from 'solid-js';
import IconButton from '../common/IconButton';
import TextInput from '../common/TextInput';
import { AiOutlineSend } from 'solid-icons/ai';
import { JSX } from 'solid-js/jsx-runtime';
import { VscChevronUp } from 'solid-icons/vsc';
import { AiOutlinePaperClip } from 'solid-icons/ai';

const inputContainerStyle = css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;

  width: 100%;
  min-height: 56px;
  overflow: hidden;
  padding: 8px 4px;

  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 4px;
  backdrop-filter: blur(16px);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    background: ${variable('Color.Grey.200')};
    opacity: ${variable('Color.Transparency.vague')};
  }
`;

const inputWrapperStyle = css`
  width: fit-content;
  max-height: calc(56px * 3);

  flex: 1;
  align-self: stretch;
  overflow: hidden;

  display: inline-flex;
  flex-flow: rows;
  justify-content: center;
  align-items: center;

  padding: 4px 12px;
  border-radius: calc(${variable('Size.text.title')});
  background: ${variable('Color.Grey.300')};
`;

const inputStyle = css`
  outline: none;
  border: none;
  resize: none;

  width: 100%;
  max-height: 100%;
  line-height: ${variable('Size.text.title')};

  color: ${variable('Color.BLACK')};
  background: transparent;
  font-size: ${variable('Size.text.title')};
`;

export interface ChatInputProps {
  
}

const ChatInput: Component<ChatInputProps> = ({
  
}) => {
  let textareaRef: HTMLTextAreaElement | undefined;
  const [height, setHeight] = createSignal<string | number>('auto');

  const onTextAreaInput: JSX.EventHandlerUnion<HTMLTextAreaElement, InputEvent> = (event) => {
    if (textareaRef) {
      textareaRef.style.height = 'auto';
      textareaRef.style.height = `${event.target.scrollHeight}px`;
    }
  }

  return (
    <div className={inputContainerStyle}>
      <IconButton
        size={getTheme().Size.icon.small}
        icon={VscChevronUp}
      />
      <div className={inputWrapperStyle}>
        <textarea
          ref={textareaRef}
          className={inputStyle}
          onInput={onTextAreaInput}
          rows={1}
        />
      </div>
      <IconButton
        size={getTheme().Size.icon.small}
        icon={AiOutlinePaperClip}
      />
      <IconButton
        size={getTheme().Size.icon.small}
        icon={AiOutlineSend}
      />
    </div>
  );
}

export default ChatInput;
