import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import className from '@/utils/className';
import { css } from '@linaria/core';
import { useCallback, useMemo, useState } from 'react';

const textStyle = css`
  padding: 8px 12px;
`;

const longTextStyle = css`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export interface TextContentProps {
  children: string;
}

const TextContent = ({ children }: TextContentProps): JSX.Element => {
  const shortText = useMemo(() => children.slice(0, 500), [children]);

  const [expand, setExpand] = useState(false);

  const onExpand = useCallback(() => setExpand((it) => !it), []);

  if (children !== shortText) {
    return (
      <div className={className(longTextStyle, textStyle)}>
        <Typography type={'body2'}>{expand ? children : shortText}</Typography>
        <Button onClick={onExpand}>{expand ? '축소' : '확장'}</Button>
      </div>
    );
  }

  return (
    <Typography type={'body2'} className={textStyle}>
      {children}
    </Typography>
  );
};

export default TextContent;
