import React from 'react';
import hotchoco from '@/../package.json';
import { css } from '@linaria/core';
import Typography from '@/components/common/Typography';

const containerStyle = css`
  width: 100%;
  height: 100%;
  text-align: center;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const InfoSettingsContainer = React.memo(() => (
  <div className={containerStyle}>
    <Typography type={'h2'}>{hotchoco.name}</Typography>
    <Typography type={'h5'}>버전: {hotchoco.version}</Typography>
    <Typography type={'h5'}>제작자: {hotchoco.author.name}</Typography>
  </div>
));

export default InfoSettingsContainer;
