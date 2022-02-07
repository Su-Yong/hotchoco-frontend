import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import SelectItem from '@/components/common/SelectItem';
import SettingItem from '@/components/settings/SettingItem';
import { accountSettings, displaySettings } from '@/constants/settings';
import { roomListWidth, themeType } from '@/store/settings';
import { StringLike } from '@/types/common';
import { css } from '@linaria/core';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';

const AccountSettingsContainer = () => {
  const autoLogoutSetting = useMemo(() => accountSettings.find(({ key }) => key === 'auto-logout'), []);
  const logoutTimeSetting = useMemo(() => accountSettings.find(({ key }) => key === 'logout-time'), []);

  return (
    <>
      {autoLogoutSetting && (
        <SettingItem settings={autoLogoutSetting}>
        </SettingItem>
      )}
      {logoutTimeSetting && (
        <SettingItem settings={logoutTimeSetting}>
        </SettingItem>
      )}
    </>
  );
};

export default AccountSettingsContainer;
