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

export interface InfoContainerProps {
  room: ChatRoom;
}

const InfoContainer = (props: InfoContainerProps) => {
  return (
    <div class={containerStyle}>
      {props.room.title}
    </div>
  )
};

export default InfoContainer;
