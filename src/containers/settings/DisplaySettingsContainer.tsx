import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import SelectItem from '@/components/common/SelectItem';
import SettingItem from '@/components/settings/SettingItem';
import { displaySettings } from '@/constants/settings';
import { roomListWidth, themeType } from '@/store/settings';
import { StringLike } from '@/types/common';
import { css } from '@linaria/core';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';

const themeStyle = css`
  width: 160px;
`;

const DisplaySettingsContainer = () => {
  const [theme, setTheme] = useAtom(themeType);
  const [roomWidth, setRoomWidth] = useAtom(roomListWidth);

  const changeTheme = useCallback((it: StringLike) => {
    setTheme(it.toString() as 'light' | 'dark');
  }, []);
  const changeRoomWidth: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const value = Number(event.target.value);

    if (Number.isFinite(value)) setRoomWidth(value);
  }, []);

  const themeSetting = useMemo(() => displaySettings.find(({ key }) => key === 'theme'), []);
  const roomWidthSetting = useMemo(() => displaySettings.find(({ key }) => key === 'room-list-width'), []);

  return (
    <>
      {themeSetting && (
        <SettingItem settings={themeSetting}>
          <Select value={theme} className={themeStyle} onChange={changeTheme}>
            <SelectItem value={'light'}>라이트 모드</SelectItem>
            <SelectItem value={'dark'}>다크 모드</SelectItem>
          </Select>
        </SettingItem>
      )}
      {roomWidthSetting && (
        <SettingItem settings={roomWidthSetting}>
          <Input value={roomWidth} onChange={changeRoomWidth} />
        </SettingItem>
      )}
    </>
  );
};

export default DisplaySettingsContainer;
