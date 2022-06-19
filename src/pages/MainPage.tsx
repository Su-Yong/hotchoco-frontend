import BottomTabs from '@/components/BottomTabs';
import Icon from '@/components/common/Icon';
import { variable } from '@/theme';
import { css } from '@linaria/core';
import { Routes, Route, useNavigate, useLocation } from 'solid-app-router';
import { createEffect, createSignal } from 'solid-js';
import { Transition } from 'solid-transition-group';
import ChatPage from './ChatPage';
import ComponentPage from './ComponentPage';

const bodyStyle = css`
  width: 100%;
  height: 100%;

  overflow: hidden;
  position: relative;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
`;

const wrapperStyle = css`
  flex: 1;

  position: relative;
  overflow: hidden;

  & > * {
    position: absolute;
    inset: 0;
  }
`;

const bottomTabStyle = css`
  width: 100%;
  height: fit-content;

  z-index: 30;
`;

const rightStart = css`
  transform: translateX(100%);
`;
const leftStart = css`
  transform: translateX(-100%);
`;

const enterEnd = css`
  transform: translateX(0%);

  transition-duration: ${variable('Animation.duration.shorter')};
  transition-timing-function: ${variable('Animation.easing.in')};
  `;

const exitStart = css`
  transform: translateX(0%);
`;

const rightEnd = css`
  transform: translateX(100%);

  transition-duration: ${variable('Animation.duration.shorter')};
  transition-timing-function: ${variable('Animation.easing.out')};
`;
const leftEnd = css`
  transform: translateX(-100%);

  transition-duration: ${variable('Animation.duration.shorter')};
  transition-timing-function: ${variable('Animation.easing.out')};
`;

const tabs = [
  {
    id: 'friend',
    icon: <Icon icon={'person'} />,
    title: '친구',
    color: variable('Primary.Main'),
  },
  {
    id: 'chat',
    icon: <Icon icon={'chat'} />,
    title: '채팅',
    color: variable('Primary.Main'),
  },
  {
    id: 'component',
    icon: <Icon icon={'more_horiz'} />,
    title: '테스트',
    color: variable('Color.Blue.500')
  },
];

export interface MainPageProps {
  
}

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [lastIndex, setLastIndex] = createSignal(0);
  const nowIndex = () => tabs.findIndex((it) => location.pathname.startsWith(`/${it.id}`));
  
  const onTabChange = (id: string) => {
    setLastIndex(nowIndex());
    navigate(`./${id}`, { replace: true });
  };

  return (
    <div class={bodyStyle}>
      <div class={wrapperStyle}>
        <Transition
          enterClass={lastIndex() > nowIndex() ? leftStart : rightStart}
          enterToClass={enterEnd}
          exitClass={exitStart}
          exitToClass={lastIndex() < nowIndex() ? leftEnd : rightEnd}
        >
          <Routes>
            <Route path={'/chat/*'} element={<ChatPage />} />
            <Route path={'/component'} element={<ComponentPage />} />
          </Routes>  
        </Transition>  
      </div>
      <div class={bottomTabStyle}>
        <BottomTabs
          tabs={tabs}
          onTabChange={onTabChange}
          selected={tabs[nowIndex()].id}
        />  
      </div>
    </div>
  )
};

export default MainPage;
