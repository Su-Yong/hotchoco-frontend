import { User } from '@/types';
import { sx } from '@/utils';
import { css, cx } from '@linaria/core';
import { FaUser } from 'solid-icons/fa';
import { Component, createMemo } from 'solid-js';
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

const UserProfile: Component<UserProfileProps> = ({
  size = 'medium',
  user,
  ...props
}) => {
  const profileSize = createMemo(() => {
    if (size === 'small') return 24;
    if (size === 'medium') return 36;
    if (size === 'large') return 48;
  });

  if (user.profile) {
    return (
      <img
      {...props}
        className={cx(profileStyle, props.className)}
        style={sx({
          '--profile-size': `${profileSize()}px`,
        }, props.style)}
        src={user.profile}
      />
    );
  }

  return (
    <div
    {...props as JSX.HTMLAttributes<HTMLDivElement>}
      style={sx({
        '--profile-size': `${profileSize()}px`,
      }, props.style)}
      className={cx(profileStyle, props.className)}
    >
      <FaUser size={profileSize()} />
    </div>
  )
}

export default UserProfile;
