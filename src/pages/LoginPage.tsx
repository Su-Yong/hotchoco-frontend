import { css } from '@linaria/core';
import Typography from '@/components/common/Typography';
import LoginContainer from '@/containers/LoginContainer';
import AuthContainer from '@/containers/AuthContainer';

const titleStyle = css`
  justify-content: center;
  align-items: center;

  margin-bottom: 16px;
`;

const LoginPage = (): JSX.Element => {
  return (
    <div>
      <Typography type={'h1'} className={titleStyle}>
        Hotchoco
      </Typography>
      <LoginContainer />
      <AuthContainer />
    </div>
  );
};

export default LoginPage;
