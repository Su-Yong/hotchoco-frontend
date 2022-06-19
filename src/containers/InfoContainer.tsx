import Profile from '@/components/chat/Profile';
import { variable } from '@/theme';
import { ChatRoom } from '@/types';
import { css } from '@linaria/core';

const containerStyle = css`
  position: relative;
  width: 100%;
  height: 480px;

  padding: ${variable('Size.space.medium')};

  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;

    background: ${variable('Color.Grey.300')};
    opacity: ${variable('Color.Transparency.vague')};
  }
`;

const headerStyle = css`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: ${variable('Size.icon.large')} 1fr;
  align-items: center;
  column-gap: ${variable('Size.space.medium')};

  & > *:nth-child(1) {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }
`;

const titleStyle = css`
  font-size: ${variable('Size.text.title')};
  margin: 0;
`;
const subtitleStyle = css`
  font-size: ${variable('Size.text.subtitle')};
`;

export interface InfoContainerProps {
  room: ChatRoom;
}

const InfoContainer = (props: InfoContainerProps) => {
  return (
    <div class={containerStyle}>
      <div class={headerStyle}>
        <Profile
          url={props.room?.thumbnail}
          size={'large'}
        />
        <h1 class={titleStyle}>
          {props.room.title}
        </h1>
        <div class={subtitleStyle}>
          참가자 {props.room.members.length}명
        </div>
      </div>
    </div>
  )
};

export default InfoContainer;
