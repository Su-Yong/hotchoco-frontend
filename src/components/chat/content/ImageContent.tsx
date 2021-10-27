import style from '@/utils/style';
import { css } from '@linaria/core';
import React from 'react';

const imageGridStyle = css`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: flex-start;

  & > img {
    flex: 1 0 auto;
    min-width: 30%;
  }

  & > img:nth-last-child(1),
  & > img:nth-last-child(2) {
    min-width: var(--percent);
  }
`;

export interface ImageContentProps {
  children: React.ReactNodeArray;
}

const ImageContent = ({ children }: ImageContentProps) => {
  return (
    <div
      className={imageGridStyle}
      style={style({
        '--percent': children.length % 3 === 1 ? '50%' : '30%',
      })}
    >
      {children}
    </div>
  );
};

export default ImageContent;
