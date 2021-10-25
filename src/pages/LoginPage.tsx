import Card from '../components/Card';
import Input from '../components/Input';
import Typography from '../components/Typography';

const LoginPage = (): JSX.Element => {
  return (
    <div>
      <Typography type={'h1'}>
        Hotchoco
      </Typography>
      <Card>
        <Input />
        <Input type={'password'}/>
        <button>로그인 하던가</button>
      </Card>
    </div>
  );
};

export default LoginPage;
