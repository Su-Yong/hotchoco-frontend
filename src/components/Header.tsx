import { css } from '@linaria/core';
import { Component } from 'solid-js';

const headerStyle = css`
  
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
