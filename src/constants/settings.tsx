
import DisplayIcon from '@iconify/icons-mdi/tv';
import AccountIcon from '@iconify/icons-mdi/account';
import ConnectionIcon from '@iconify/icons-mdi/cloud';
import { IconifyIcon } from '@iconify/react';
import Nullish from '@/types/Nullish';

type SwitchOption = { type: 'switch', value: boolean };
type RadioOption = { type: 'radio', value: string[] };
type CheckOption = { type: 'check', value: string[] };
type ListOption = { type: 'list', value: string[] };
type SliderOption = { type: 'slider', value?: number; min: number; max: number; };

type Options = (
  SwitchOption
  | RadioOption
  | CheckOption
  | ListOption
  | SliderOption
);

export class Setting {
  private _key: string;
  private _title: string;
  private _icon: IconifyIcon | Nullish;
  private options: Options | Nullish;

  constructor(key: string, title: string, icon: IconifyIcon | Nullish = null, options: Options | Nullish = null) {
    this._key = key;
    this._title = title;
    this._icon = icon;
    this.options = options;
  }

  get key() {
    return this._key;
  }
  get title() {
    return this._title;
  }
  get icon() {
    return this._icon;
  }
}

export class Settings {
  private _key: string;
  private _title: string;
  private _icon: IconifyIcon | Nullish;
  private settings: Setting[] = [];

  constructor(key: string, title: string, icon: IconifyIcon | Nullish = null) {
    this._key = key;
    this._title = title;
    this._icon = icon;
  }

  get key() {
    return this._key;
  }
  get title() {
    return this._title;
  }
  get icon() {
    return this._icon;
  }

  add(setting: Setting) {
    this.settings.push(setting);
  }

  forEach(func: (setting: Setting, index: number) => unknown) {
    this.settings.forEach((v, i) => func(v, i));
  }

  map<T extends unknown>(func: (setting: Setting, index: number) => T): T[] {
    return this.settings.map((v, i) => func(v, i));
  }
}

const displaySettings = new Settings('display', '화면', DisplayIcon);

const themeSetting = new Setting('use-theme', '테마를 설정합니다', DisplayIcon, { type: 'list', value: ['라이트', '다크', '테스트'] });
const roomListSizeSetting = new Setting('room-list-size', '좌측 방들의 크기를 조절합니다', DisplayIcon, { type: 'slider', min: 0, max: 1000 });

displaySettings.add(themeSetting);
displaySettings.add(roomListSizeSetting);

const settings: Settings[] = [
  displaySettings,
  new Settings('account', '계정', AccountIcon),
  new Settings('connection', '연결', ConnectionIcon),
];

export default settings;