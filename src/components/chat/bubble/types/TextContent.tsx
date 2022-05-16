import IconButton from '@/components/common/IconButton';
import { css, cx } from '@linaria/core';
import { Component, createEffect, createSignal, Show } from 'solid-js';
import { VscChevronDown } from 'solid-icons/vsc';
import { variable } from '@/theme';
import TextButton from '@/components/common/TextButton';

const LENGTH_LIMIT = 200;

const containerStyle = css`
  display: inline-flex;
  flex-flow: column;
`;

const toggleStyle = css`
  transform: rotate(var(--rotate));
  /* align-self: center; */

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};
`;

export interface TextContentProps {
  content: string;
}

const TextContent: Component<TextContentProps> = ({
  content,
}) => {
  if (content.length > LENGTH_LIMIT) {
    const smallContent = content.substring(0, LENGTH_LIMIT) + '...';

    const [collapse, setCollapse] = createSignal(true);
    const [visibleContent, setVisibleContent] = createSignal(smallContent);

    const onToggleCollapse = () => {
      setCollapse((it) => !it);
    };

    createEffect(() => {
      if (collapse()) setVisibleContent(smallContent);
      else setVisibleContent(content);
    });

    return (
      <div className={containerStyle}>
        {visibleContent()}
        
        <TextButton
          onClick={onToggleCollapse}
          className={toggleStyle}
        >
        <Show
          when={collapse()}
          fallback={'접기'}
        >
          펼치기
      </Show>
        </TextButton>
      </div>
    );
  }

  return (
    <div className={containerStyle}>
      {content}
    </div>
  );
}

export default TextContent;
