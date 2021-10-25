import { css } from '@linaria/core';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Input from '@/components/common/Input';
import Typography from '@/components/common/Typography';

const titleStyle = css`
  justify-content: center;
  align-items: center;

  margin-bottom: 16px;
`;

const cardStyle = css`
  padding: 16px;

  gap: 8px;

  align-items: end;
`;

const LoginPage = (): JSX.Element => {
  return (
    <div>
      <Typography type={'h1'} className={titleStyle}>
        Hotchoco
      </Typography>
      <Card className={cardStyle}>
        <Input type={'email'} placeholder={'email'} />
        <Input type={'password'} placeholder={'password'} />
        <Button>로그인</Button>
      </Card>
    </div>
  );
};

export default LoginPage;
