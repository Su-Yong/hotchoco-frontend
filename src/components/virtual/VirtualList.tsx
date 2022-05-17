import { variable } from '@/theme';
import { css, cx } from '@linaria/core';
import { nanoid } from 'nanoid';
import { Accessor, Component, createEffect, createSignal, For, on, onMount } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { calculateVisibleRange } from './calculateVisibleRange';

const DEFAULT_HEIGHT = 50;
const MAX_COUNT = 200;
const MIN_COUNT = 10;

const wrapperStyle = css`
  width: 100%;
  overflow: auto;
`;

const innerScrollerStyle = css`
  width: 100%;
  height: fit-content;
`;

const devStyle = css`
  position: fixed;
  z-index: 100000;
  top: 8px;
  left: 8px;

  background: ${variable('Color.WHITE')};
  color: ${variable('Color.BLACK')};
`;

type AllowProperty = (
  'style'
  | 'class' | 'className' | 'classList'
);
export interface VirtualListProps<T> extends Pick<JSX.HTMLAttributes<HTMLDivElement>, AllowProperty> {
  items: T[];
  children: (item: T, index: Accessor<number>) => JSX.Element;

  overscan?: number;
  itemHeight?: number | ((index: number) => number);
  topMargin?: number;
  bottomMargin?: number;

  innerStyle?: JSX.HTMLAttributes<HTMLDivElement>['style'];
  innerClassName?: JSX.HTMLAttributes<HTMLDivElement>['className'];
}

const VirtualList = <T extends unknown>(props: VirtualListProps<T>): JSX.Element => {
  const ignoreClass = nanoid();

  const [frameHeight, setFrameHeight] = createSignal(0);
  const [topPadding, setTopPadding] = createSignal(0);
  const [bottomPadding, setBottomPadding] = createSignal(0);

  let defaultItemHeight = (
    typeof props.itemHeight === 'function'
      ? DEFAULT_HEIGHT
      : (props.itemHeight ?? DEFAULT_HEIGHT)
  );
  let itemHeights = new Map<number, number>();
  const [range, setRange] = createSignal<[number, number]>([0, 30]);

  const getHeight = (index: number) => {
    const defaultValue = typeof props.itemHeight === 'function' ? props.itemHeight(index) : defaultItemHeight;

    return Number(itemHeights.get(index) ?? defaultValue);
  };

  let frameRef: HTMLDivElement | undefined;
  let parentRef: HTMLDivElement | undefined;
  
  const onScroll: JSX.EventHandlerUnion<HTMLDivElement, UIEvent> = (event) => {
    const scroll = event.target.scrollTop;
    const height = event.target.clientHeight;

    const top = topPadding();
    const [start, end] = range();
    let [newStart, newEnd] = calculateVisibleRange(
      [start, end],
      { top, scroll, height },
      { getHeight, overscan: props.overscan ?? 5, length: props.items.length },
    );

    if (start !== newStart || end !== newEnd) {
      console.log('range', start, end, '->', newStart, newEnd);
      setRange([newStart, newEnd]);
    }
  };

  onMount(() => {
    const frameRect = frameRef?.getBoundingClientRect();

    if (frameRect && frameHeight() === 0) setFrameHeight(frameRect.height);
  });

  const resizeObserver = new ResizeObserver((entries) => {
    for(const entry of entries) {
      const index = Number(entry.target.getAttribute('data-index'));

      if (Number.isFinite(index)) {
        const rect = entry.target.getBoundingClientRect();

        itemHeights.set(index, rect.height ?? defaultItemHeight);
      }
    }
  });

  const [dev, setDev] = createSignal('');
  createEffect(() => {
    const [start, end] = range();

    const children = Array.from(parentRef!.children);
    resizeObserver.disconnect();
    for (let i = start; i < end; i++) {
      if (!children[i - start + 1]) continue;
      resizeObserver.observe(children[i - start + 1]);
      children[i - start + 1].setAttribute('data-index', i.toString());

      if (itemHeights.has(i)) continue;
      const rect = children[i - start + 1].getBoundingClientRect();
      setDev(JSON.stringify(parentRef?.scrollTop));
      itemHeights.set(i, rect.height ?? defaultItemHeight);
    }

    let top = 0;
    let bottom = 0;

    for(let i = 0; i < start; i++) {
      top += itemHeights.get(i) ?? defaultItemHeight;
    }
    for(let i = end; i < props.items.length; i++) {
      bottom += itemHeights.get(i) ?? defaultItemHeight;
    }

    setTopPadding(top);
    setBottomPadding(bottom);
  });

  return (
    <div
      ref={frameRef}
      className={cx(wrapperStyle, props.className)}
      onScroll={onScroll}
      {...props}
    >
      <div className={devStyle}>
        {range().join('-')}
        {'\n'}
        {topPadding()}
        {':'}
        {bottomPadding()}
        {dev()}
      </div>
      <div
        ref={parentRef}
        style={props.innerStyle}
        className={cx(innerScrollerStyle, props.innerClassName)}
      >
        <div className={ignoreClass} style={`height: ${(props.topMargin ?? 0)+ topPadding() || 0}px;`} />
        <For each={props.items.slice(...range())}>
          {(item, index) => props.children(item, () => index() + range()[0])}
        </For>
        <div className={ignoreClass} style={`height: ${(props.bottomMargin ?? 0) + bottomPadding() || 0}px;`} />
      </div>
    </div>
  );
}

export default VirtualList;
