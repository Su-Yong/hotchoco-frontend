import { css } from '@linaria/core';
import { Component } from 'solid-js';

const headerStyle = css`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;

  font-size: 24px;
  font-weight: bolder;

  padding: 12px 16px;
  margin: 0;
`;

export interface HeaderProps {
  
}

const Header: Component<HeaderProps> = ({
  children,
}) => {
  

  return (
    <h1 className={headerStyle}>
      {children}
    </h1>
  );
}

export default Header;
