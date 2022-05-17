import { variable } from '@/theme';
import { css, cx } from '@linaria/core';
import { Component } from 'solid-js';
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

const Header: Component<HeaderProps> = ({
  leftIcon,
  rightIcon,
  children,
  ...props
}) => {
  

  return (
    <h1
      {...props}
      className={cx(
        headerStyle,
        leftIcon && leftIconHeaderStyle,  
        rightIcon && rightIconHeaderStyle,  
        props.className,
      )}
    >
      {leftIcon}
      {children}
      <div style={'flex: 1;'} />
      {rightIcon}
    </h1>
  );
}

export default Header;
