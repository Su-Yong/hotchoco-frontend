
import DisplayIcon from '@iconify/icons-mdi/tv';
import AccountIcon from '@iconify/icons-mdi/account';
import ConnectionIcon from '@iconify/icons-mdi/cloud';
import { IconifyIcon } from '@iconify/react';

export interface Settings {
  key: string;
  title: string;
  icon?: IconifyIcon;
  children?: Settings[];
}

const displaySettings: Settings[] = [
  {
    key: 'use-theme',
    title: '테마를 설정합니다',
    icon: DisplayIcon,
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
    children: [],
  },
  {
    key: 'connection',
    title: '연결',
    icon: ConnectionIcon,
    children: [],
  },
];

export default settings;