import { getTheme, variable } from '@/theme';
import { css } from '@linaria/core';
import { Component, createSignal, Show } from 'solid-js';
import IconButton from '../common/IconButton';
import { JSX } from 'solid-js/jsx-runtime';
import { Transition } from 'solid-transition-group';
import { Portal } from 'solid-js/web';
import Popup from '../common/Popup';

const inputContainerStyle = css`
  position: relative;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;

  width: 100%;
  min-height: 56px;
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
  font-size: ${variable('Size.text.body')};
`;

const panelStyle = css`
  position: relative;

  width: fit-content;
  max-width: 100%;
  min-height: ${variable('Size.icon.large')};

  padding: ${variable('Size.space.medium')};
  border-radius: ${variable('Size.space.medium')};
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: ${variable('Size.space.medium')};

  overflow: hidden;
  background: transparent;
  backdrop-filter: blur(16px);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;

    background: ${variable('Color.Grey.200')};
    opacity: ${variable('Color.Transparency.vague')};

    transition-duration: ${variable('Animation.duration.short')};
    transition-timing-function: ${variable('Animation.easing.deceleration')};
  }
`;

const panelButtonStyle = css`
  transform: rotate(0deg);

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};

  [data-open="true"] & {
    transform: rotate(90deg);
    color: ${variable('Primary.Text')};
  }
`;

const panelButtonOuterStyle = css`
  border-radius: 100%;

  [data-open="true"] & {
    opacity: 1;
    transform: scale(1);
    background: ${variable('Primary.Main')};
  }
`;

export interface ChatInputProps extends JSX.HTMLAttributes<HTMLDivElement> {
  onSend?: (message: string) => void;
}

const ChatInput: Component<ChatInputProps> = (props) => {
  let textareaRef: HTMLTextAreaElement | undefined;

  const [message, setMessage] = createSignal('');
  const [panelOpen, setPanelOpen] = createSignal(false);
  const [moreButton, setMoreButton] = createSignal<HTMLDivElement>();

  const onSend = () => {
    props.onSend?.(message());

    console.log('send message', message());
    setMessage('');

    textareaRef?.focus();
  };

  const onKeyDown: JSX.EventHandlerUnion<HTMLTextAreaElement, KeyboardEvent> = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      
      onSend();
    }
  };

  const onTextAreaInput: JSX.EventHandlerUnion<HTMLTextAreaElement, InputEvent> = (event) => {
    if (textareaRef) {
      textareaRef.style.height = 'auto';
      textareaRef.style.height = `${event.target.scrollHeight}px`;
    }

    setMessage(event.currentTarget.value);
  }

  return (
    <div
      {...props}
      data-open={panelOpen()}
      className={inputContainerStyle}
    >
      <IconButton
        ref={setMoreButton}
        size={getTheme().Size.icon.small}
        icon={'attachment'}
        className={panelButtonStyle}
        outerClassName={panelButtonOuterStyle}
        onClick={() => setPanelOpen((it) => !it)}
      />
      <div className={inputWrapperStyle}>
        <textarea
          ref={textareaRef}
          className={inputStyle}
          value={message()}
          onInput={onTextAreaInput}
          onKeyDown={onKeyDown}
          rows={1}
        />
      </div>
      <IconButton
        size={getTheme().Size.icon.small}
        icon={'send'}
        onClick={onSend}
      />
      <Popup
        open={panelOpen()}
        anchor={moreButton()}
        origin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        targetOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        gapX={variable('Size.space.medium')}
        gapY={`calc(-2 * ${variable('Size.space.medium')})`}
      >
        <div className={panelStyle}>
          <IconButton icon={'camera'} />
          <IconButton icon={'photo'} />
          <IconButton icon={'movie'} />
          <IconButton icon={'music_note'} />
          <IconButton icon={'attachment'} />
          <IconButton icon={'how_to_vote'} />
        </div>
      </Popup>
    </div>
  );
}

export default ChatInput;
