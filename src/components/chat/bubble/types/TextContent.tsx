import { css } from '@linaria/core';
import { Component, createEffect, createSignal, Show } from 'solid-js';
import { VscChevronDown, VscChevronUp } from 'solid-icons/vsc';
import TextButton from '@/components/common/TextButton';

const LENGTH_LIMIT = 1000;

const containerStyle = css`
  display: inline-flex;
  flex-flow: column;
  gap: 4px;

  white-space: pre-line;
`;

const toggleStyle = css`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export interface TextContentProps {
  content: string;
}

const TextContent: Component<TextContentProps> = (props) => {
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
            fallback={<>
              <VscChevronUp className={'icon'} />
              접기
            </>}
          >
            <VscChevronDown className={'icon'} />
            더보기
          </Show>
        </TextButton>
      </div>
    );
  }

  return (
    <div className={containerStyle}>
      {props.content}
    </div>
  );
}

export default TextContent;
