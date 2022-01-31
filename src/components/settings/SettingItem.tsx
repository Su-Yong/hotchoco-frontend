import { Settings } from '@/constants/settings';
import { useTheme } from '@/theme';
import style from '@/utils/style';
import { Icon } from '@iconify/react';
import { css } from '@linaria/core';
import { PropsWithChildren, useMemo } from 'react';

const containerStyle = css`
  width: 100%;

  border-radius: 4px;
  padding: 16px;

  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  background: var(--th-backgroundSecondary-main);
  box-sizing: border-box;
`;

const titleStyle = css`
  flex: 1;
`;

export type SettingItemProps =
  | {
      settings: Omit<Settings, 'children'>;
    }
  | Omit<Settings, 'children'>;

const SettingItem = (props: PropsWithChildren<SettingItemProps>) => {
  const theme = useTheme();

  const key = useMemo(() => ('settings' in props ? props.settings.key : props.key), [props]);
  const title = useMemo(() => ('settings' in props ? props.settings.title : props.title), [props]);
  const icon = useMemo(() => ('settings' in props ? props.settings.icon : props.icon), [props]);

  return (
    <div key={key} className={containerStyle}>
      {icon && <Icon icon={icon} />}
      <div className={titleStyle}>{title}</div>
      {props.children}
    </div>
  );
};

export default SettingItem;
