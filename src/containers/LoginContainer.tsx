
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Input from '@/components/common/Input';
import { css } from '@linaria/core';

const cardStyle = css`
  padding: 16px;

  gap: 8px;

  align-items: end;
`;

const LoginContainer = () => {
  return (
    <Card className={cardStyle}>
      <Input type={'email'} placeholder={'email'} />
      <Input type={'password'} placeholder={'password'} />
      <Button>로그인</Button>
    </Card>
  );
}

export default LoginContainer;
