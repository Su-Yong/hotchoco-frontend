import { useTheme } from '@/theme';
import className from '@/utils/className';
import ColorUtil from '@/utils/Color';
import style from '@/utils/style';
import { css } from '@linaria/core';
import React, { useMemo } from 'react';

const waveStyle = css`
  background: linear-gradient(
    to right,
    var(--th-backgroundSecondary-main),
    var(--th-backgroundSecondary-main) 30%,
    var(--accent),
    var(--th-backgroundSecondary-main) 70%,
    var(--th-backgroundSecondary-main)
  );
  background-size: 240px;
  background-position: 0px;
  animation: background var(--duration) linear infinite;

  @keyframes background {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: 240px 0;
    }
  }
`;

const pulseStyle = css`
  animation: background var(--duration) linear infinite;

  @keyframes background {
    0% {
      background: var(--th-backgroundSecondary-main);
    }

    50% {
      background: var(--accent);
    }

    100% {
      background: var(--th-backgroundSecondary-main);
    }
  }
`;

export interface PlaceholderProps {
  animationType?: 'wave' | 'pulse';
  duration?: number;
}

const Placeholder = ({ animationType, duration: initDuration, children }: PlaceholderProps & { children: React.ReactElement }): JSX.Element => {
  const theme = useTheme();

  const animationStyle = useMemo(() => {
    if ((animationType ?? 'wave') === 'wave') return waveStyle;
    else return pulseStyle;
  }, [animationType]);

  const duration = useMemo(() => {
    if (typeof initDuration === 'number') return `${initDuration}s`;

    return '2s';
  }, [initDuration]);

  return React.cloneElement(children, {
    ...children.props,
    className: className(children.props.className, animationStyle),
    style: style({
      ...children.props.style,
      '--accent': ColorUtil.darken(theme.palette.backgroundSecondary.main, 0.05),
      '--duration': duration,
    }),
  });
};

export default Placeholder;
