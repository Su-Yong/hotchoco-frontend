import Input from '@/components/common/Input';
import Switch from '@/components/common/Switch';
import SettingItem from '@/components/settings/SettingItem';
import { accountSettings } from '@/constants/settings';
import { autoLogout, logoutTime } from '@/store/settings';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';

const AccountSettingsContainer = () => {
  const autoLogoutSetting = useMemo(() => accountSettings.find(({ key }) => key === 'auto-logout'), []);
  const logoutTimeSetting = useMemo(() => accountSettings.find(({ key }) => key === 'logout-time'), []);

  const [autoLogoutValue, setAutoLogout] = useAtom(autoLogout);
  const [logoutTimeValue, setLogoutTime] = useAtom(logoutTime);

  const onChangeLogoutTime: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const value = Number(event.target.value);

    if (Number.isFinite(value)) setLogoutTime(value);
  }, []);

  return (
    <>
      {autoLogoutSetting && (
        <SettingItem settings={autoLogoutSetting}>
          <Switch value={autoLogoutValue} onChecked={setAutoLogout} />
        </SettingItem>
      )}
      {logoutTimeSetting && (
        <SettingItem settings={logoutTimeSetting}>
          <Input value={logoutTimeValue} onChange={onChangeLogoutTime} />
        </SettingItem>
      )}
    </>
  );
};

export default AccountSettingsContainer;
