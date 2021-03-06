import { css, cx } from '@linaria/core';
import { nanoid } from 'nanoid';
import { Accessor, batch, createEffect, createSignal, For, on, onMount, splitProps, useTransition } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { calculateVisibleRange } from './calculateVisibleRange';

const DEFAULT_HEIGHT = 50;
const THROTTLE = 100;

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

export interface VirtualListRef {}
export interface VirtualListProps<T> extends Pick<JSX.HTMLAttributes<HTMLDivElement>, AllowProperty> {
  ref?: VirtualListRef;
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
  const [local, children, leftProps] = splitProps(props, [
    'items',
    'overscan',
    'itemHeight',
    'topMargin',
    'bottomMargin',
    'innerStyle',
    'innerClassName',
  ], ['children']);

  const ignoreClass = nanoid();

  const [frameHeight, setFrameHeight] = createSignal(0);
  const [topPadding, setTopPadding] = createSignal(0);
  const [bottomPadding, setBottomPadding] = createSignal(0);

  const [isRangeChanged, startRangeChange] = useTransition();

  let defaultItemHeight = (
    typeof local.itemHeight === 'function'
      ? DEFAULT_HEIGHT
      : (local.itemHeight ?? DEFAULT_HEIGHT)
  );
  let itemHeights = new Map<number, number>();
  const [range, setRange] = createSignal<[number, number]>([0, 30]);

  const getHeight = (index: number) => {
    const defaultValue = typeof local.itemHeight === 'function' ? local.itemHeight(index) : defaultItemHeight;

    return Number(itemHeights.get(index) ?? defaultValue);
  };

  let frameRef: HTMLDivElement | undefined;
  let parentRef: HTMLDivElement | undefined;
  
  const calculateRange = (scroll: number, height: number) => {
    const top = topPadding();
    const [start, end] = range();
    let [newStart, newEnd] = calculateVisibleRange(
      [start, end],
      { top, scroll, height },
      { getHeight, overscan: local.overscan ?? 5, length: local.items.length },
    );

    if (start !== newStart || end !== newEnd) {
      const children = Array.from(parentRef!.children);
      for (let i = newStart; i < newEnd; i++) {
        if (!children[i - start + 1]) continue;
        if (itemHeights.has(i)) continue;

        const rect = children[i - start + 1].getBoundingClientRect();
        
        itemHeights.set(i, rect.height ?? defaultItemHeight);
      }

      let newTop = 0;
      let newBottom = 0;

      for(let i = 0; i < newStart; i++) {
        newTop += itemHeights.get(i) ?? defaultItemHeight;
      }
      for(let i = newEnd; i < local.items.length; i++) {
        newBottom += itemHeights.get(i) ?? defaultItemHeight;
      }

      startRangeChange(() => {
        setRange([newStart, newEnd]);
        setTopPadding(newTop);
        setBottomPadding(newBottom);
      });
    }
  };

  const onScroll: JSX.EventHandlerUnion<HTMLDivElement, UIEvent> = (event) => {
    if (isRangeChanged()) return;

    const scroll = event.target.scrollTop;
    const height = event.target.clientHeight;

    calculateRange(scroll, height);
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

  createEffect(on(() => local.items, () => {
    if (!parentRef || !frameRef) return;

    const scroll = parentRef.scrollTop;
    const height = parentRef.clientHeight;

    calculateRange(scroll, height);
  }));

  createEffect(() => {
    const [start, end] = range();

    const children = Array.from(parentRef!.children);
    resizeObserver.disconnect();
    for (let i = start; i < end; i++) {
      if (!children[i - start + 1]) continue;

      children[i - start + 1].setAttribute('data-index', i.toString());
      resizeObserver.observe(children[i - start + 1]);
    }
  });

  return (
    <div
      {...leftProps}
      ref={frameRef}
      className={cx(wrapperStyle, leftProps.className)}
      onScroll={onScroll}
    >
      <div
        ref={parentRef}
        style={local.innerStyle}
        className={cx(innerScrollerStyle, local.innerClassName)}
      >
        <div className={ignoreClass} style={`height: ${(local.topMargin ?? 0)+ topPadding() || 0}px;`} />
        <For each={local.items.slice(...range())}>
          {(item, index) => children.children(item, () => index() + range()[0])}
        </For>
        <div className={ignoreClass} style={`height: ${(local.bottomMargin ?? 0) + bottomPadding() || 0}px;`} />
      </div>
    </div>
  );
}

export default VirtualList;
