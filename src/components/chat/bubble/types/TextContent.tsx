import { css, cx } from '@linaria/core';
import { Component, createEffect, createSignal, Show } from 'solid-js';
import { VscChevronDown } from 'solid-icons/vsc';
import TextButton from '@/components/common/TextButton';
import { variable } from '@/theme';

const LENGTH_LIMIT = 500;

const containerStyle = css`
  height: fit-content;
  overflow: hidden;

  transition-property: height;
  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};
`;

const textStyle = css`
  display: inline-flex;
  flex-flow: column;
  gap: ${variable('Size.space.small')};

  font-size: ${variable('Size.text.body')};
  white-space: pre-line;
`;

const toggleStyle = css`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  gap: ${variable('Size.space.medium')};

  & > .icon {
    transform: rotate(180deg);

    transition-duration: ${variable('Animation.duration.short')};
    transition-timing-function: ${variable('Animation.easing.deceleration')};
  }

  &[data-collapse="true"] > .icon {
    transform: rotate(0deg);
  }
`;

export interface TextContentProps {
  content: string;
}

const TextContent: Component<TextContentProps> = (props) => {
  let textDiv: HTMLDivElement | undefined;
  let containerDiv: HTMLDivElement | undefined;
 
  if (props.content.length > LENGTH_LIMIT) {
    const smallContent = () => props.content.substring(0, LENGTH_LIMIT) + '...';

    const [collapse, setCollapse] = createSignal(true);
    const [visibleContent, setVisibleContent] = createSignal(smallContent());

    const onToggleCollapse = () => {
      setCollapse((it) => !it);
    };

    createEffect(() => {
      if (collapse()) setVisibleContent(smallContent());
      else setVisibleContent(props.content);

      setTimeout(() => {
        if (textDiv && containerDiv) {
          containerDiv.style.height = `${textDiv.clientHeight}px`;
        }
      }, 0);
    });

    return (
      <div ref={containerDiv} className={containerStyle}>
        <div ref={textDiv} className={textStyle}>
          {visibleContent()}
          <TextButton
            data-collapse={collapse()}
            onClick={onToggleCollapse}
            className={toggleStyle}
          >
            <VscChevronDown className={'icon'} />
            <Show
              when={collapse()}
              fallback={'접기'}
            >
              더보기
            </Show>
          </TextButton>
        </div>
      </div>
    );
  }

  return (
    <div className={cx(containerStyle, textStyle)}>
      {props.content}
    </div>
  );
}

export default TextContent;
