import Icon from '@/components/common/Icon';
import { MenuItem } from '@/components/common/MenuList';
import { mainColor, setMainColor, setThemeMode, themeMode } from '@/store/display';
import { roomContainerWidth, roomLayout, setRoomContainerWidth, setRoomLayout } from '@/store/room';
import { getCSSVariables, getTheme, getVariableName, Theme, variable } from '@/theme';
import { LightTheme } from '@/theme/defined/LightTheme';
import { Accessor, Setter } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

export interface PreferenceBaseType<Type extends string, Value extends unknown> {
  id: string;
  name: string;
  description?: string;
  type: Type;
  icon: () => JSX.Element;
  defaultValue: Value;
  signal?: [Accessor<Value>, Setter<Value>];
}

export interface CheckPreferenceType extends PreferenceBaseType<'check', boolean> {
}

export interface SwitchPreferenceType extends PreferenceBaseType<'switch', boolean> {
}

export interface TextPreferenceType extends PreferenceBaseType<'text', string> {
}

export interface NumberPreferenceType extends PreferenceBaseType<'number', number> {
  min?: number;
  max?: number;
}

export interface RadioPreferenceType extends PreferenceBaseType<'radio', string> {
  values: MenuItem[];
}

export interface SelectPreferenceType extends PreferenceBaseType<'select', string> {
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
  name: '화면',
  preferences: [
    {
      id: 'theme',
      icon: () => <Icon icon={'palette'} />,
      name: '테마',
      type: 'select',
      defaultValue: 'light',
      required: true,
      signal: [themeMode, setThemeMode],
      values: [
        { id: 'light', name: '라이트 모드', icon: () => <Icon icon={'light_mode'} /> },
        { id: 'dark', name: '다크 모드', icon: () => <Icon icon={'dark_mode'} /> },
      ],
    },
    {
      id: 'mainColor',
      icon: () => <Icon icon={'format_color_fill'} />,
      name: '메인 색상',
      type: 'select',
      defaultValue: getVariableName('Color.Blue.500'),
      required: true,
      signal: [mainColor, setMainColor],
      // 테마 키값을 추출하기 위한 더미 LightTheme, 타입도 중요하지 않음
      values: Object
        .entries(getCSSVariables(LightTheme))
        .filter(([key]) => key.startsWith('--th-color'))
        .map(([key, value]) => ({
          id: key,
          name: (value as string).toString(),
          icon: () => (
            <div
              style={{
                width: variable('Size.icon.small'),
                height: variable('Size.icon.small'),
                'border-radius': variable('Size.icon.small'),
                background: `var(${key})`,
              }}
            />
          )
        })),
    }
  ],
};

export const chatPreferenceGroup: PreferenceGroupType = {
  id: 'chat',
  name: '채팅',
  preferences: [
    {
      id: 'roomContainerWidth',
      icon: () => <Icon icon={'width_full'} />,
      name: '채팅방 가로 크기',
      type: 'number',
      defaultValue: 320,
      min: 320,
      max: 1280,
      signal: [roomContainerWidth, setRoomContainerWidth],
    },
    {
      id: 'chatRoomLayout',
      icon: () => <Icon icon={'view_list'} />,
      name: '채팅방 레이아웃',
      type: 'select',
      defaultValue: 'list',
      required: true,
      signal: [roomLayout, setRoomLayout],
      values: [
        { id: 'list', name: '리스트', icon: () => <Icon icon={'view_list'} /> },
        { id: 'grid', name: '그리드', icon: () => <Icon icon={'grid_view'} /> },
      ]
    },
  ],
}

export const serverPreferenceGroup: PreferenceGroupType = {
  id: 'server',
  name: '서버',
  preferences: [
    {
      id: 'serverUrl',
      icon: () => <Icon icon={'dns'} />,
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
      icon: () => <Icon icon={'autorenew'} />,
      name: '자동 로그인',
      type: 'switch',
      defaultValue: false,
    },
    {
      id: 'logoutTimeout',
      icon: () => <Icon icon={'logout'} />,
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
  chatPreferenceGroup,
  serverPreferenceGroup,
  accountPreferenceGroup,
];
