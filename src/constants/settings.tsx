import DisplayIcon from '@iconify/icons-mdi/tv';
import ThemeIcon from '@iconify/icons-mdi/palette';
import RoomWidthIcon from '@iconify/icons-mdi/view-column';
import AccountIcon from '@iconify/icons-mdi/account';
import ConnectionIcon from '@iconify/icons-mdi/cloud';
import ServerIcon from '@iconify/icons-mdi/router';
import LogoutIcon from '@iconify/icons-mdi/logout';
import TimeoutIcon from '@iconify/icons-mdi/schedule';
import InfoIcon from '@iconify/icons-mdi/info-circle';
import { IconifyIcon } from '@iconify/react';

export interface Settings {
  key: string;
  title: string;
  icon?: IconifyIcon;
  children?: Settings[];
}

export const displaySettings: Settings[] = [
  {
    key: 'theme',
    title: '테마를 설정합니다',
    icon: ThemeIcon,
  },
  {
    key: 'room-list-width',
    title: '채팅방 리스트의 좌우 폭을 설정합니다',
    icon: RoomWidthIcon,
  },
];

export const connectionSettings: Settings[] = [
  {
    key: 'server-url',
    title: '사용할 서버를 설정합니다',
    icon: ServerIcon,
  },
];

export const accountSettings: Settings[] = [
  {
    key: 'auto-logout',
    title: '자동 로그아웃을 사용합니다',
    icon: LogoutIcon,
  },
  {
    key: 'logout-time',
    title: '탭이 닫히고 몇초 뒤에 로그아웃 될 지 정합니다',
    icon: TimeoutIcon,
  },
];

const settings: Settings[] = [
  {
    key: 'display',
    title: '화면',
    icon: DisplayIcon,
    children: displaySettings,
  },
  {
    key: 'account',
    title: '계정',
    icon: AccountIcon,
    children: accountSettings,
  },
  {
    key: 'connection',
    title: '연결',
    icon: ConnectionIcon,
    children: connectionSettings,
  },
  {
    key: 'info',
    title: '정보',
    icon: InfoIcon,
    children: [],
  },
];

export default settings;
