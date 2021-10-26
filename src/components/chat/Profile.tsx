import React from 'react';
import { css } from '@linaria/core';

const profileStyle = css`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

export interface ProfileProps {
  url?: string;
}

const Profile = ({ url }: ProfileProps): JSX.Element => (
  <img className={profileStyle} src={url} />
);

export default Profile;
