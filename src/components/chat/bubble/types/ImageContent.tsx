import { css } from '@linaria/core';
import { Component, createSignal, For, Show } from 'solid-js';
import { variable } from '@/theme';
import Hoverable from '@/components/common/Hoverable';
import Icon from '@/components/common/Icon';

const containerStyle = css`
  margin: -8px;
  border-radius: 8px;
  overflow: hidden;

  width: calc(100% + 16px);

  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  gap: 4px;
`;

const imageStyle = css`
  min-width: calc(100% / 4);
  height: auto;

  flex: 1;

  padding: 0;

  & > img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const moreStyle = css`
  position: relative;
  flex: 1;

  display: inline-flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  gap: 4px;

  color: ${variable('Color.WHITE')};
  padding: 0;
  overflow: hidden;
  z-index: 1;
  font-size: 24px;

  & > * {
    z-index: 3;
  }

  & > img {
    position: absolute;
    inset: 0;

    width: 100%;
    height: auto;

    overflow: hidden;
    object-fit: cover;
    z-index: -1;

    filter: blur(8px);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 2;

    background: ${variable('Color.Grey.500')};
    opacity: 0.3;
  }
`;

export interface ImageContentProps {
  sources: string[];
}

const ImageContent: Component<ImageContentProps> = (props) => {
  const smallSource = () => props.sources.slice(0, Math.min(9, props.sources.length));
  const leftSources = () => props.sources.slice(9);

  const [nowSources, setNowSources] = createSignal(leftSources().length > 0 ? smallSource().slice(0, 8) : smallSource());

  const onToggle = () => {
    if (nowSources().length === props.sources.length) {
      setNowSources(leftSources().length > 0 ? smallSource().slice(0, 8) : smallSource());
    } else {
      setNowSources(props.sources);
    }
  };

  return (
    <div className={containerStyle}>
      <For each={nowSources()}>
        {(url) => (
          <Hoverable
            borderless={false}
            overlayColor={'Color.BLACK'}
            className={imageStyle}
          >
            <img src={url} />
          </Hoverable>
        )}
      </For>
      <Show when={leftSources().length > 0}>
        <Hoverable
          borderless={false}
          overlayColor={'Color.BLACK'}
          className={moreStyle}
          onClick={onToggle}
        >
          <Show
            when={nowSources().length === props.sources.length}
            fallback={(
              <>
                <img src={leftSources()[0]} />
                <Icon icon={'add'} />
                <span>{leftSources().length + 1}</span>
              </>
            )}
          >
          <Icon icon={'chevron_left'} />
          </Show>
        </Hoverable>
      </Show>
    </div>
  );
}

export default ImageContent;
