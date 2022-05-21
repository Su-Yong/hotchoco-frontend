import { getTheme, variable } from '@/theme';
import { Color, ColorSheet } from '@/theme/ColorSheet';
import { User } from '@/types';
import { Leaves, sx } from '@/utils';
import { css, cx } from '@linaria/core';
import { IconTypes } from 'solid-icons';
import { FaUser } from 'solid-icons/fa';
import { Component, createMemo, mergeProps, splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

const profileStyle = css`
  width: var(--profile-size);
  height: var(--profile-size);
  border-radius: 50%;

  transition-property: border, box-shadow;

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};
`;

const ringgedProfileStyle = css`
  border: 1px solid transparent;
  box-shadow: 0 0 0 2px var(--ring-color);
`;

export interface ProfileProps extends JSX.HTMLAttributes<HTMLImageElement> {
  size?: 'small' | 'medium' | 'large';
  url?: string;
  fallback?: IconTypes;
  ring?: Leaves<ColorSheet>;
}

const Profile: Component<ProfileProps> = (props) => {
  const [local, leftProps] = splitProps(
    mergeProps(
      { size: 'large', fallback: FaUser },
      props,
    ),
    ['size', 'url', 'fallback', 'ring'],
  );

  const profileSize = createMemo(() => getTheme().Size.icon[local.size]);

  if (local.url) {
    return (
      <img
      {...leftProps}
        className={cx(profileStyle, leftProps.className)}
        classList={{
          ...leftProps.classList,
          [ringgedProfileStyle]: !!local.ring,
        }}
        style={sx({
          '--profile-size': profileSize(),
          '--ring-color': local.ring ? variable(`Color.${local.ring}`) : '',
        }, leftProps.style)}
        src={local.url}
      />
    );
  }

  return (
    <div
      {...leftProps as JSX.HTMLAttributes<HTMLDivElement>}
      style={sx({
        '--profile-size': profileSize(),
        '--ring-color': local.ring ? variable(`Color.${local.ring}`) : '',
      }, leftProps.style)}
      className={cx(profileStyle, leftProps.className)}
      classList={{
        ...leftProps.classList,
        [ringgedProfileStyle]: !!local.ring,
      }}
    >
      <local.fallback size={profileSize()} />
    </div>
  )
}

export default Profile;
