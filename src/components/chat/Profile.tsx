import React from 'react';
import { css } from '@linaria/core';
import style from '@/utils/style';

const profileStyle = css`
  width: var(--size);
  height: var(--size);
  border-radius: 24px;

  user-select: none;
`;

export interface ProfileProps {
  url?: string;
  size?: number;
}

const Profile = React.memo(({ url, size = 48 }: ProfileProps): JSX.Element => (
  <img
    style={style({
      '--size': `${size}px`,
    })}
    className={profileStyle}
    src={url}
  />
));

export default Profile;
