import { getTheme } from '@/theme';
import { User } from '@/types';
import { sx } from '@/utils';
import { css, cx } from '@linaria/core';
import { FaUser } from 'solid-icons/fa';
import { Component, createMemo, mergeProps, splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

const profileStyle = css`
  width: var(--profile-size);
  height: var(--profile-size);
  border-radius: 50%;
`;

export interface UserProfileProps extends JSX.HTMLAttributes<HTMLImageElement> {
  size?: 'small' | 'medium' | 'large';
  user: User;
}

const UserProfile: Component<UserProfileProps> = (props) => {
  const [local, leftProps] = splitProps(mergeProps({ size: 'large' }, props), ['size', 'user']);

  const profileSize = createMemo(() => getTheme().Size.icon[local.size]);

  if (local.user.profile) {
    return (
      <img
      {...leftProps}
        className={cx(profileStyle, leftProps.className)}
        style={sx({
          '--profile-size': profileSize(),
        }, leftProps.style)}
        src={local.user.profile}
      />
    );
  }

  return (
    <div
    {...leftProps as JSX.HTMLAttributes<HTMLDivElement>}
      style={sx({
        '--profile-size': profileSize(),
      }, leftProps.style)}
      className={cx(profileStyle, leftProps.className)}
    >
      <FaUser size={profileSize()} />
    </div>
  )
}

export default UserProfile;
