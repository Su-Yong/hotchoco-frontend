import Card from '../components/Card';
import Input from '../components/Input';

const LoginPage = (): JSX.Element => {
  return (
    <div>
      Hotchoco
      <Card>
        <Input />
        <Input />
        <button>로그인 하던가</button>
      </Card>
    </div>
  );
};

export default LoginPage;
