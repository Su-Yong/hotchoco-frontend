import { Theme, variable } from '@/theme';
import { Leaves, sx } from '@/utils';
import { css, cx } from '@linaria/core';
import { Component, mergeProps, splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

const iconStyle = css`
  font-size: var(--icon-size, 24px);
`;

export interface IconProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  icon: string;
  size?: string;
}

const Icon: Component<IconProps> = (props) => {
  const [local, leftProps] = splitProps(
    mergeProps({ size: variable('Size.icon.small') }, props),
    ['icon', 'size', 'children'],
  );

  return (
    <span
      style={sx({
        '--icon-size': local.size,
      })}
      className={cx('material-symbols-outlined', iconStyle, leftProps.className)}
    >
      {local.icon}
    </span>
  );
}

export default Icon;
