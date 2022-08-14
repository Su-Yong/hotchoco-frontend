import { variable } from '@/theme';
import { css, cx } from '@linaria/core';
import { Component, splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

const headerStyle = css`
  width: 100%;
  height: 56px;

  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;

  font-size: ${variable('Size.text.head')};
  font-weight: bolder;

  padding: 12px 16px;
  margin: 0;
`;

const leftIconHeaderStyle = css`
  padding-left: 8px;
`;
const rightIconHeaderStyle = css`
  padding-right: 12px;
`;

export interface HeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
}

const Header: Component<HeaderProps> = (props) => {
  const [icons, children, leftProps] = splitProps(props, ['leftIcon', 'rightIcon'], ['children']);

  return (
    <h1
      {...leftProps}
      classList={{
        [headerStyle]: true,
        [leftIconHeaderStyle]: !!icons.leftIcon,
        [rightIconHeaderStyle]: !!icons.rightIcon,
        ...props.classList,
      }}
    >
      {icons.leftIcon}
      {children.children}
      <div style={'flex: 1;'} />
      {icons.rightIcon}
    </h1>
  );
}

export default Header;
