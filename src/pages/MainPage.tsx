import Icon from '@/components/common/Icon';
import { variable } from '@/theme';
import { css } from '@linaria/core';
import { Routes, Route, useNavigate, useLocation } from 'solid-app-router';
import { createEffect, createSignal } from 'solid-js';
import { Transition } from 'solid-transition-group';
import ChatPage from './ChatPage';
import ComponentPage from './ComponentPage';
import Tabs from '@/components/tab/Tabs';
import createMediaSignal from '@/hooks/createMediaSignal';

const bodyStyle = css`
  width: 100%;
  height: 100%;

  overflow: hidden;
  position: relative;

  display: flex;

  @media (max-width: 640px) {
    flex-flow: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  
  @media (min-width: 640px) {
    flex-flow: row-reverse;
    justify-content: flex-start;
    align-items: stretch;
  }
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

const tabStyle = css`
  z-index: 30;

  @media (max-width: 640px) {
    width: 100%;
    height: fit-content;
  }
  
  @media (min-width: 640px) {
    width: fit-content;
    height: 100%;
  }
`;

const nextStart = css`
  transform: translateX(100%);

  @media (min-width: 640px) {
    opacity: 0;
    transform: translateY(10%);
  }
`;
const prevStart = css`
  transform: translateX(-100%);

  @media (min-width: 640px) {
    opacity: 0;
    transform: translateY(-10%);
  }
`;

const enterEnd = css`
  opacity: 1;
  transform: translate(0%);

  transition-duration: ${variable('Animation.duration.shorter')};
  transition-timing-function: ${variable('Animation.easing.in')};
  `;

const exitStart = css`
  opacity: 1;
  transform: translate(0%);
`;

const nextEnd = css`
  transform: translateX(100%);

  @media (min-width: 640px) {
    opacity: 0;
    transform: translateY(10%);
  }

  transition-duration: ${variable('Animation.duration.shorter')};
  transition-timing-function: ${variable('Animation.easing.out')};
`;
const prevEnd = css`
  transform: translateX(-100%);

  @media (min-width: 640px) {
    opacity: 0;
    transform: translateY(-10%);
  }

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
  const isScreenNarrow = createMediaSignal('(max-width: 640px)');
  
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
          enterClass={lastIndex() > nowIndex() ? prevStart : nextStart}
          enterToClass={enterEnd}
          exitClass={exitStart}
          exitToClass={lastIndex() < nowIndex() ? prevEnd : nextEnd}
        >
          <Routes>
            <Route path={'/chat/*'} element={<ChatPage />} />
            <Route path={'/component'} element={<ComponentPage />} />
          </Routes>
        </Transition>
      </div>
      <div class={tabStyle}>
        <Tabs
          direction={isScreenNarrow() ? 'horizontal' : 'vertical'}
          tabs={tabs}
          onTabChange={onTabChange}
          selected={tabs[nowIndex()].id}
        />  
      </div>
    </div>
  )
};

export default MainPage;
