import { MenuItem } from '@/components/common/MenuList';
import { IconTypes } from 'solid-icons';
import { FaMoon, FaSun } from 'solid-icons/fa';
import {
  VscServerEnvironment,
  VscSignOut,
  VscSymbolColor,
  VscSync,
  VscTextSize,
} from 'solid-icons/vsc';

export interface PreferenceBaseType<Type extends string> {
  id: string;
  name: string;
  type: Type;
  icon: IconTypes;
}

export interface CheckPreferenceType extends PreferenceBaseType<'check'> {
  defaultValue: boolean;
}

export interface SwitchPreferenceType extends PreferenceBaseType<'switch'> {
  defaultValue: boolean;
}

export interface TextPreferenceType extends PreferenceBaseType<'text'> {
  defaultValue: string;
}

export interface NumberPreferenceType extends PreferenceBaseType<'number'> {
  defaultValue: number;
  min?: number;
  max?: number;
}

export interface RadioPreferenceType extends PreferenceBaseType<'radio'> {
  defaultValue: string;
  values: MenuItem[];
}

export interface SelectPreferenceType extends PreferenceBaseType<'select'> {
  defaultValue: string;
  required?: boolean;
  values: MenuItem[];
}

export type PreferenceType = (
  CheckPreferenceType
  | SwitchPreferenceType
  | TextPreferenceType
  | NumberPreferenceType
  | RadioPreferenceType
  | SelectPreferenceType
);

export interface PreferenceGroupType {
  id: string;
  name: string;
  preferences: PreferenceType[];
}

export const appearancePreferenceGroup: PreferenceGroupType = {
  id: 'appearance',
  name: 'Appearance',
  preferences: [
    {
      id: 'theme',
      icon: VscSymbolColor,
      name: '테마',
      type: 'select',
      defaultValue: 'light',
      required: true,
      values: [
        { id: 'light', name: '라이트 모드', icon: FaSun },
        { id: 'dark', name: '다크 모드', icon: FaMoon },
      ],
    },
    {
      id: 'fontSize',
      icon: VscTextSize,
      name: '폰트 크기',
      type: 'number',
      defaultValue: 14,
      min: 8,
      max: 24,
    },
  ],
};

export const serverPreferenceGroup: PreferenceGroupType = {
  id: 'server',
  name: '서버',
  preferences: [
    {
      id: 'serverUrl',
      icon: VscServerEnvironment,
      name: '서버 주소',
      type: 'text',
      defaultValue: 'http://localhost:3000',
    },
  ],
};

export const accountPreferenceGroup: PreferenceGroupType = {
  id: 'account',
  name: '계정',
  preferences: [
    {
      id: 'autoLogin',
      icon: VscSync,
      name: '자동 로그인',
      type: 'switch',
      defaultValue: false,
    },
    {
      id: 'logoutTimeout',
      icon: VscSignOut,
      name: '자동 로그아웃 시간 (단위: 분)',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 60,
    },
  ],
};

export const preferenceGroupList = [
  appearancePreferenceGroup,
  serverPreferenceGroup,
  accountPreferenceGroup,
];
