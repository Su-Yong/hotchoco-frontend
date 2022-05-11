export interface PreferenceBaseType<Type extends string> {
  id: string;
  name: string;
  type: Type;
}

export interface CheckPreferenceType extends PreferenceBaseType<'check'> {
  defaultValue: boolean;
  value?: boolean;
}

export interface SwitchPreferenceType extends PreferenceBaseType<'switch'> {
  defaultValue: boolean;
  value?: boolean;
}

export interface TextPreferenceType extends PreferenceBaseType<'text'> {
  defaultValue: string;
  value?: string;
}

export interface NumberPreferenceType extends PreferenceBaseType<'number'> {
  defaultValue: number;
  value?: number;
  min?: number;
  max?: number;
}

export interface RadioPreferenceType extends PreferenceBaseType<'radio'> {
  defaultValue: string;
  value?: string;
  values: { id: string; name: string; }[]
}

export interface SelectPreferenceType extends PreferenceBaseType<'select'> {
  defaultValue: string;
  value?: string;
  values: { id: string; name: string; }[]
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
      name: '테마',
      type: 'select',
      defaultValue: 'light',
      values: [
        { id: 'light', name: 'Light' },
        { id: 'dark', name: 'Dark' },
      ],
    },
    {
      id: 'fontSize',
      name: '폰트 크기',
      type: 'number',
      defaultValue: 14,
      value: 14,
      min: 8,
      max: 24,
    },
    {
      id: 'fontFamily',
      name: '폰트 종류',
      type: 'select',
      defaultValue: 'sans-serif',
      values: [
        { id: 'sans-serif', name: 'Sans-Serif' },
        { id: 'serif', name: 'Serif' },
        { id: 'monospace', name: 'Monospace' },
      ],
    },
  ],
};

export const serverPreferenceGroup: PreferenceGroupType = {
  id: 'server',
  name: '서버',
  preferences: [
    {
      id: 'serverUrl',
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
      name: '자동 로그인',
      type: 'switch',
      defaultValue: false,
    },
    {
      id: 'logoutTimeout',
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
