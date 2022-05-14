import { css, cx } from '@linaria/core';
import { nanoid } from 'nanoid';
import { Component, createEffect, createSignal, For, on, onMount } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

const DEFAULT_HEIGHT = 50;

const wrapperStyle = css`
  width: 100%;
  overflow: auto;
`;

const innerScrollerStyle = css`
  width: 100%;
  height: fit-content;
`;

type AllowProperty = (
  'style'
  | 'class' | 'className' | 'classList'
);
export interface VirtualListProps<T> extends Pick<JSX.HTMLAttributes<HTMLDivElement>, AllowProperty> {
  items: T[];
  children: (item: T) => JSX.Element;

  overscan?: number;
  itemHeight?: number | ((index: number) => number);

  innerStyle?: JSX.HTMLAttributes<HTMLDivElement>['style'];
  innerClassName?: JSX.HTMLAttributes<HTMLDivElement>['className'];
}

const VirtualList = <T extends unknown>({
  items,
  children,
  overscan = 3,
  itemHeight: initItemHeight,

  innerStyle,
  innerClassName,
  ...props
}: VirtualListProps<T>): JSX.Element => {
  const ignoreClass = nanoid();

  const [frameHeight, setFrameHeight] = createSignal(0);
  const [topPadding, setTopPadding] = createSignal(0);
  const [bottomPadding, setBottomPadding] = createSignal(0);

  let defaultItemHeight = (
    typeof initItemHeight === 'function'
      ? DEFAULT_HEIGHT
      : (initItemHeight ?? DEFAULT_HEIGHT)
  );
  let itemHeights = new Map<number, number>();
  const [range, setRange] = createSignal<[number, number]>([0, 30]);

  let frameRef: HTMLDivElement | undefined;
  let parentRef: HTMLDivElement | undefined;
  const onScroll: JSX.EventHandlerUnion<HTMLDivElement, UIEvent> = (event) => {
    const scroll = event.target.scrollTop;
    const height = event.target.clientHeight;
    
    const top = topPadding();
    const [start, end] = range();
    const getHeight = (index: number) => {
      const defaultValue = typeof initItemHeight === 'function' ? initItemHeight(index) : defaultItemHeight;

      return itemHeights.get(index) ?? defaultValue;
    };

    let totalOffset = 0;
    let startMaxOffset = 0;
    let startMinOffset = 0;
    let endMaxOffset = 0;
    let endMinOffset = 0;
    for (let i = 0; i < overscan; i++) {
      const startValue = getHeight(start + i);
      const endValue = getHeight(end - i);

      startMaxOffset += startValue;
      if (i < overscan - 1) startMinOffset += startValue;
      endMaxOffset += endValue;
      if (i < overscan - 1) endMinOffset += endValue;
    }

    for (let i = start; i < end; i++) {
      totalOffset += getHeight(i);
    }

    let newStart = start;
    let newEnd = end;

    if (top + startMaxOffset < scroll) {
      let value = 1;

      let offsetStack = getHeight(newStart - value);
      while (top + startMinOffset + offsetStack < scroll) {
        offsetStack += getHeight(newStart + value);
        value += 1;
      }

      newStart = Math.min(newStart + value - 1, items.length);
    }
    if (top + startMinOffset > scroll) {
      let value = 1;

      let offsetStack = getHeight(newStart - value);
      while (top + startMinOffset - offsetStack > scroll) {
        offsetStack += getHeight(newStart - value);
        value += 1;
      }

      newStart = Math.max(newStart - value + 1, 0);
    }

    if (top + totalOffset - endMinOffset < scroll + height) {
      let value = 1;

      let offsetStack = getHeight(newStart - value);
      while (top + totalOffset - endMinOffset + offsetStack < scroll + height) {
        offsetStack += getHeight(newStart + value);
        value += 1;
      }

      newEnd = Math.min(newEnd + value - 1, items.length);
    }
    if (top + totalOffset - endMaxOffset > scroll + height) {
      let value = 1;

      let offsetStack = getHeight(newStart - value);
      while (top + totalOffset - endMaxOffset - offsetStack> scroll + height) {
        offsetStack += getHeight(newStart - value);
        value += 1;
      }

      newEnd = Math.max(newEnd - value + 1, 0);
    }

    if (start !== newStart || end !== newEnd) {
      console.log('range', start, end, '->', newStart, newEnd);
      setRange([newStart, newEnd]);
    }
  };

  onMount(() => {
    const frameRect = frameRef?.getBoundingClientRect();

    if (frameRect && frameHeight() === 0) setFrameHeight(frameRect.height);
  });

  createEffect(() => {
    const [start, end] = range();

    const children = Array.from(parentRef!.children);
    for (let i = 0; i < end - start; i++) {
      if (itemHeights.has(i)) continue;

      itemHeights.set(i, children[i]?.getBoundingClientRect()?.height ?? defaultItemHeight);
    }
  });

  createEffect(on(range, ([start, end]) => {
    let top = 0;
    let bottom = 0;

    for(let i = 0; i < start; i++) {
      top += itemHeights.get(i) ?? defaultItemHeight;
    }
    for(let i = end; i < items.length; i++) {
      bottom += itemHeights.get(i) ?? defaultItemHeight;
    }

    setTopPadding(top);
    setBottomPadding(bottom);
  }));

  return (
    <div
      ref={frameRef}
      className={cx(wrapperStyle, props.className)}
      onScroll={onScroll}
      {...props}
    >
      <div
        ref={parentRef}
        style={innerStyle}
        className={cx(innerScrollerStyle, innerClassName)}
      >
        <div className={ignoreClass} style={`height: ${topPadding() || 0}px;`} />
        <For each={items.slice(...range())}>
          {(item) => children(item)}
        </For>
        <div className={ignoreClass} style={`height: ${bottomPadding() || 0}px;`} />
      </div>
    </div>
  );
}

export default VirtualList;
