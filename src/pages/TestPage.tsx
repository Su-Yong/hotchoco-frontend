import ChatBubble from '@/components/chat/ChatBubble';
import ImageContent from '@/components/chat/content/ImageContent';
import TextContent from '@/components/chat/content/TextContent';
import Profile from '@/components/chat/Profile';
import Room from '@/components/chat/Room';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Typography from '@/components/common/Typography';
import ChatBubblePlaceholder from '@/components/placeholder/ChatBubblePlaceholder';
import { css } from '@linaria/core';
import { useCallback, useState } from 'react';

const containerStyle = css`
  max-width: 60%;
  height: 100vh;
  overflow: auto;
`;

const chatListStyle = css`
  width: 100%;
  min-width: 320px;
  padding: 0;
`;

const TestPage = (): JSX.Element => {
  const [count, setCount] = useState(1);

  const onPlus = useCallback(() => {
    setCount((it) => it + 1);
  }, []);
  const onMinus = useCallback(() => {
    setCount((it) => (it > 1 ? it - 1 : 1));
  }, []);

  return (
    <div className={containerStyle}>
      <Typography type={'h1'}>Test Page</Typography>
      <Card>
        <Typography>ChatBubble</Typography>
        <div style={{ display: 'flex', flexFlow: 'row' }}>
          <Button onClick={onPlus}>+</Button>
          <Button onClick={onMinus}>-</Button>
        </div>
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
            <TextContent>First Test ChatBubble</TextContent>
          </ChatBubble>
          <ChatBubble
            sender={
              <Typography type={'caption1'} style={{ color: 'red' }}>
                sender
              </Typography>
            }
            profile={<Profile url={'https://dummyimage.com/120x120/000/fff'} />}
            readers={['1', '2']}
            time={new Date()}
          >
            <ImageContent>
              {Array.from({ length: count }).map((_, i) => (
                <img key={i} src={'https://dummyimage.com/120x120/000/fff'} />
              ))}
            </ImageContent>
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
            <TextContent>Third Test ChatBubble</TextContent>
          </ChatBubble>
          <ChatBubblePlaceholder
            animationType={'wave'}
          />
          <ChatBubblePlaceholder
            animationType={'pulse'}
          />
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
            <TextContent>
              LOREM IPSUM FONT GENERATOR IMAGES PLUGINS GENERATORS ENGLISH Lorem Ipsum Generator Generate Lorem Ipsum placeholder text. Select the number of
              characters, words, sentences or paragraphs, and hit generate! GENERATED LOREM IPSUM 5 PARAGRAPHS COPY Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor rhoncus dolor purus non. Et malesuada fames ac
              turpis egestas integer eget aliquet. Aliquet enim tortor at auctor. Blandit libero volutpat sed cras ornare arcu dui. Nulla pellentesque dignissim
              enim sit amet. Augue mauris augue neque gravida in fermentum et sollicitudin. Feugiat pretium nibh ipsum consequat. Leo integer malesuada nunc vel
              risus. Morbi tempus iaculis urna id volutpat lacus laoreet non. At erat pellentesque adipiscing commodo elit. Pharetra vel turpis nunc eget lorem
              dolor sed. Non nisi est sit amet facilisis magna etiam tempor. Arcu cursus vitae congue mauris rhoncus aenean vel. Eget mi proin sed libero enim.
              Mattis molestie a iaculis at erat pellentesque. Placerat in egestas erat imperdiet sed. Laoreet suspendisse interdum consectetur libero id
              faucibus. Enim ut tellus elementum sagittis vitae et. Sollicitudin ac orci phasellus egestas tellus rutrum. In iaculis nunc sed augue lacus
              viverra vitae congue. Eget duis at tellus at urna condimentum mattis. Nunc consequat interdum varius sit amet. Sollicitudin tempor id eu nisl nunc
              mi ipsum. Elit eget gravida cum sociis natoque penatibus et magnis dis. Nibh praesent tristique magna sit amet purus. Sit amet dictum sit amet
              justo. Arcu vitae elementum curabitur vitae nunc sed. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam. Erat pellentesque
              adipiscing commodo elit. Dolor purus non enim praesent elementum facilisis leo vel fringilla. Pulvinar sapien et ligula ullamcorper malesuada
              proin libero. Euismod elementum nisi quis eleifend. Ut enim blandit volutpat maecenas. Purus ut faucibus pulvinar elementum integer enim neque
              volutpat ac. Proin nibh nisl condimentum id venenatis a condimentum. Et magnis dis parturient montes nascetur ridiculus mus. Pellentesque elit
              eget gravida cum sociis. Est lorem ipsum dolor sit. Id eu nisl nunc mi. Tincidunt arcu non sodales neque sodales ut. Nullam vehicula ipsum a arcu
              cursus. Fusce id velit ut tortor pretium viverra suspendisse potenti. Diam sit amet nisl suscipit adipiscing bibendum. Eu consequat ac felis
              donec. Interdum velit euismod in pellentesque massa placerat duis. Habitasse platea dictumst vestibulum rhoncus est pellentesque. Vivamus at augue
              eget arcu dictum. Maecenas ultricies mi eget mauris pharetra et ultrices neque. Nunc scelerisque viverra mauris in aliquam. In cursus turpis massa
              tincidunt dui ut ornare. Bibendum ut tristique et egestas quis. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Mauris commodo
              quis imperdiet massa tincidunt. Pharetra magna ac placerat vestibulum lectus mauris ultrices. Vitae suscipit tellus mauris a diam maecenas sed
              enim ut. At erat pellentesque adipiscing commodo elit. Id aliquet risus feugiat in ante metus dictum at tempor. Tortor at auctor urna nunc id
              cursus. Mauris vitae ultricies leo integer malesuada. Senectus et netus et malesuada fames ac. Tincidunt tortor aliquam nulla facilisi cras
              fermentum. Sem nulla pharetra diam sit. Diam donec adipiscing tristique risus nec feugiat in fermentum. Felis eget velit aliquet sagittis id
              consectetur purus ut. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. At auctor urna nunc id cursus metus. Est lorem ipsum
              dolor sit. Mi eget mauris pharetra et ultrices neque ornare. In pellentesque massa placerat duis. Dictum varius duis at consectetur lorem donec
              massa sapien faucibus. © 2015 — 2021 PRIVACY POLICY SITEMAP FONT GENERATOR IMAGES PLUGINS GENERATORS SHARE THE LOREM WA SAI
            </TextContent>
          </ChatBubble>
        </ul>
      </Card>

      <Typography type={'h1'}>ChatRoomList</Typography>
      <Card>
        <Room
          name={'테스트 채팅방 1'}
          description={'대충 설명 1'}
          image={<img src={'https://dummyimage.com/120x120/000/fff'} />}
          info={new Date().toLocaleTimeString()}
          badge={<div style={{ width: 24, height: 24, background: 'red', borderRadius: 24 }}>1</div>}
        />
        <Room
          name={'테스트 채팅방 2'}
          description={'대충 설명 2'}
          image={<img src={'https://dummyimage.com/120x120/000/fff'} />}
          info={new Date().toLocaleTimeString()}
          badge={<div style={{ width: 24, height: 24, background: 'red', borderRadius: 24 }}>1</div>}
        />
        <Room
          actived
          name={'테스트 채팅방 3'}
          description={'대충 설명 3'}
          image={<img src={'https://dummyimage.com/120x120/000/fff'} />}
          info={new Date().toLocaleTimeString()}
          badge={<div style={{ width: 24, height: 24, background: 'red', borderRadius: 24 }}>1</div>}
        />
      </Card>
    </div>
  );
};

export default TestPage;
