import Input from '@/components/common/Input';
import Switch from '@/components/common/Switch';
import SettingItem from '@/components/settings/SettingItem';
import { accountSettings, connectionSettings } from '@/constants/settings';
import { AUTO_LOGOUT, LOGOUT_TIME, SERVER_URL } from '@/store/settings';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';

const ConnectSettingsContainer = () => {
  const serverUrlSetting = useMemo(() => connectionSettings.find(({ key }) => key === 'server-url'), []);
  
  const [serverUrlValue, setServerURL] = useAtom(SERVER_URL);

  const onChangeServerURL: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setServerURL(event.target.value);
  }, []);

  return (
    <>
      {serverUrlSetting && (
        <SettingItem settings={serverUrlSetting}>
          <Input value={serverUrlValue} onChange={onChangeServerURL} />
        </SettingItem>
      )}
    </>
  );
};

export default ConnectSettingsContainer;
