import ChatBubble from '@/components/chat/ChatBubble';
import Card from '@/components/common/Card';
import Typography from '@/components/common/Typography';
import { css } from '@linaria/core';

const chatListStyle = css`
  width: 100%;
  min-width: 320px;
  padding: 0;
`;

const TestPage = (): JSX.Element => {
  return (
    <div>
      <Typography type={'h1'}>Test Page</Typography>
      <Card>
        <Typography>ChatBubble</Typography>
        <ul className={chatListStyle}>
          <ChatBubble
            sender={
              <Typography type={'caption1'} style={{ color: 'red' }}>
                sender
              </Typography>
            }
            readers={['1', '2']}
            time={new Date()}
          >
            First Test ChatBubble
          </ChatBubble>
          <ChatBubble
            sender={
              <Typography type={'caption1'} style={{ color: 'red' }}>
                sender
              </Typography>
            }
            profile={<div style={{ width: 24, height: 24, background: 'blue' }} />}
            readers={['1', '2']}
            time={new Date()}
          >
            Second Test ChatBubble
          </ChatBubble>
          <ChatBubble
            mine
            sender={
              <Typography type={'caption1'} style={{ color: 'blue' }}>
                me
              </Typography>
            }
            profile={<div style={{ width: 24, height: 24, background: 'brown' }} />}
            readers={['1', '2']}
            time={new Date()}
          >
            Third Test ChatBubble
          </ChatBubble>
          <ChatBubble
            sender={
              <Typography type={'caption1'} style={{ color: 'red' }}>
                sender
              </Typography>
            }
            profile={<div style={{ width: 24, height: 24, background: 'blue' }} />}
            readers={['1', '2']}
            time={new Date()}
          >
            short
          </ChatBubble>
        </ul>
      </Card>
    </div>
  );
};

export default TestPage;
