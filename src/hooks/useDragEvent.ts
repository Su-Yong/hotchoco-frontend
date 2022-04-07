import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Position = {
  // start position relative
  x: number;
  y: number;

  // Parent relative position
  offsetX: number;
  offsetY: number;

  // document position (without scroll)
  clientX: number;
  clientY: number;

  // document position (with scroll)
  pageX: number;
  pageY: number;

  // whole screen position
  screenX: number;
  screenY: number;
}

type DragCallback = ((position: Position) => void) | {
  onDragStart?: (position: Position) => void,
  onDrag?: (position: Position) => void,
  onDragEnd?: (position: Position) => void,
};

const ZERO: Position = {
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 0,
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
  screenX: 0,
  screenY: 0
};

const useDragEvent = <Element extends HTMLElement>(callback: DragCallback, deps: unknown[]) => {
  const lastData = useRef<Position>(ZERO);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [startData, setStartData] = useState<Pick<Position, 'x' | 'y'> | null>(null);

  const listener = useMemo(() => {
    if (typeof callback === 'function') {
      return {
        onDrag: callback,
      };
    }

    return callback;
  }, deps);

  const onDrag = useCallback(({
    type = 'drag',
    offsetX, offsetY,
    clientX, clientY,
    pageX, pageY,
    screenX, screenY,
  }: (Omit<Position, 'x' | 'y'> & { type?: 'drag' | 'start'; }) | (Omit<Partial<Position>, 'x' | 'y'> & { type: 'end' })) => {
    const data: Position = {
      x: clientX ? clientX - (startData?.x ?? clientX) : lastData.current.x,
      y: clientY ? clientY - (startData?.y ?? clientY) : lastData.current.y,
      offsetX: offsetX ?? lastData.current.offsetX,
      offsetY: offsetY ?? lastData.current.offsetY,
      clientX: clientX ?? lastData.current.clientX,
      clientY: clientY ?? lastData.current.clientY,
      pageX: pageX ?? lastData.current.pageX,
      pageY: pageY ?? lastData.current.pageY,
      screenX: screenX ?? lastData.current.screenX,
      screenY: screenY ?? lastData.current.screenY,
    };

    if (!type || type === 'drag') {
      listener.onDrag?.(data);
    } else if (type === 'start') {
      listener.onDragStart?.(data);
    } else if (type === 'end') {
      listener.onDragEnd?.(data);
    }

    lastData.current = data;
  }, [startData, listener, lastData]);

  useEffect(() => {
    if (targetRect) {
      const mouseend = (event: MouseEvent) => {
        onDrag({
          type: 'end',
          clientX: event.clientX,
          clientY: event.clientY,
          offsetX: event.pageX - targetRect.left,
          offsetY: event.pageY - targetRect.top,
          pageX: event.pageX,
          pageY: event.pageY,
          screenX: event.pageX,
          screenY: event.pageY,
        });
  
        setTargetRect(null);
        setStartData(null);
      };
      const touchend = ({ touches }: TouchEvent) => {
        const item = touches.item(0);
        console.log('end', touches);
        
        onDrag({
          type: 'end',
          clientX: item?.clientX,
          clientY: item?.clientY,
          offsetX: item?.pageX ? item.pageX - targetRect.left : undefined,
          offsetY: item?.pageY ? item.pageY - targetRect.top : undefined,
          pageX: item?.pageX,
          pageY: item?.pageY,
          screenX: item?.pageX,
          screenY: item?.pageY,
        });

        setTargetRect(null);
        setStartData(null);
      };
      document.addEventListener('mouseup', mouseend);
      document.addEventListener('touchend', touchend);
      document.addEventListener('touchcancel', touchend);
  
      return () => {
        document.removeEventListener('mouseup', mouseend);
        document.removeEventListener('touchend', touchend);
        document.removeEventListener('touchcancel', touchend);
      }
    }
  }, [onDrag, targetRect]);

  useEffect(() => {
    if (targetRect) {
      const mousemove = (event: MouseEvent) => {
        onDrag({
          type: 'drag',
          clientX: event.clientX,
          clientY: event.clientY,
          offsetX: event.pageX - targetRect.left,
          offsetY: event.pageY - targetRect.top,
          pageX: event.pageX,
          pageY: event.pageY,
          screenX: event.pageX,
          screenY: event.pageY,
        });
      };
      const touchmove = ({ touches }: TouchEvent) => {
        const item = touches.item(0);
        
        if (item) {
          onDrag({
            type: 'drag',
            clientX: item.clientX,
            clientY: item.clientY,
            offsetX: item.pageX - targetRect.left,
            offsetY: item.pageY - targetRect.top,
            pageX: item.pageX,
            pageY: item.pageY,
            screenX: item.pageX,
            screenY: item.pageY,
          });
        }
      };
  
      document.addEventListener('mousemove', mousemove);
      document.addEventListener('touchmove', touchmove);
  
      return () => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('touchmove', touchmove);
      }
    }
  }, [onDrag, targetRect]);

  
  const onMouseDown: React.MouseEventHandler<Element> = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setTargetRect(rect);
    setStartData({ x: event.clientX, y: event.clientY });

    onDrag({
      type: 'start',
      clientX: event.clientX,
      clientY: event.clientY,
      offsetX: event.pageX - rect.left,
      offsetY: event.pageY - rect.top,
      pageX: event.pageX,
      pageY: event.pageY,
      screenX: event.pageX,
      screenY: event.pageY,
    });
  }, [listener]);

  const onTouchStart: React.TouchEventHandler<Element> = useCallback(({ touches, currentTarget }) => {
    const item = touches.item(0);
    const rect = currentTarget.getBoundingClientRect();

    setTargetRect(rect);
    setStartData({ x: item.clientX, y: item.clientY });
    onDrag({
      type: 'start',
      clientX: item.clientX,
      clientY: item.clientY,
      offsetX: item.pageX - rect.left,
      offsetY: item.pageY - rect.top,
      pageX: item.pageX,
      pageY: item.pageY,
      screenX: item.pageX,
      screenY: item.pageY,
    });
  }, [listener, onDrag]);

  return {
    onMouseDown,
    onTouchStart,
  }
};

export default useDragEvent;
