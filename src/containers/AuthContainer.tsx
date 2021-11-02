import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import Typography from "@/components/common/Typography";
import { css } from "@linaria/core";

const cardStyle = css`
  padding: 16px;

  gap: 8px;

  align-items: start;
`;

const buttonStyle = css`
  align-self: end;
`;

const AuthContainer = () => {
  return (
    <Card className={cardStyle}>
      <Typography type={'caption1'}>인증코드</Typography>
      <Input type={'password'} placeholder={'code'} />
      <Button className={buttonStyle}>인증</Button>
    </Card>
  )
};

export default AuthContainer;
