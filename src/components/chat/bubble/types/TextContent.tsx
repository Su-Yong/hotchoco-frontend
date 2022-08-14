import { css, cx } from '@linaria/core';
import { Component, createEffect, createSignal, onMount, Show } from 'solid-js';
import TextButton from '@/components/common/TextButton';
import { getTheme, variable } from '@/theme';
import Icon from '@/components/common/Icon';
import { cssTimeToMs } from '@/utils/css';

const containerStyle = css`
  height: fit-content;
  overflow: hidden;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: ${variable('Size.space.small')};

  transition-property: height;
  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};
`;

const textStyle = css`
  font-size: ${variable('Size.text.body')};
  white-space: pre-line;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: var(--line-clamp, 3);
  -webkit-box-orient: vertical;

`;

const toggleStyle = css`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  gap: ${variable('Size.space.small')};

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

  const [collapse, setCollapse] = createSignal(true);
  const [isOverflow, setOverflow] = createSignal(false);

  onMount(() => {
    setTimeout(() => {
      const textNode = textDiv?.childNodes[0];
      if (!textDiv || !textNode) return;

      const range = document.createRange();
      range.selectNodeContents(textNode);
      const rect = range.getBoundingClientRect?.();
      if (rect) setOverflow(textDiv.clientHeight < (rect.bottom - rect.top));
    }, cssTimeToMs(getTheme().Animation.duration.short) ?? 350);
  });

  return (
    <div ref={containerDiv} class={containerStyle}>
      <div
        ref={textDiv}
        class={textStyle}
        style={collapse() ? '--line-clamp: 10;' : '--line-clamp: 100000;'}
      >
        {props.content}
      </div>
      <Show when={isOverflow()}>
        <TextButton
          data-collapse={collapse()}
          onClick={() => setCollapse(!collapse())}
          className={toggleStyle}
        >
          <Icon icon={'expand_more'} className={'icon'} />
          <Show
            when={collapse()}
            fallback={'접기'}
          >
            더보기
          </Show>
        </TextButton>
      </Show>
    </div>
  );
}

export default TextContent;
