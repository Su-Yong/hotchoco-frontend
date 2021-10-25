import Typography from '@/components/common/Typography';
import { useMemo } from 'react';

export interface TextContentProps {
  children: string;
}

const TextContent = ({ children }: TextContentProps): JSX.Element => {
  const isLong = useMemo(() => children.length > 500, [children]);

  if (isLong) {
    return <div></div>;
  }

  return <Typography type={'body2'}>{children}</Typography>;
};

export default TextContent;
