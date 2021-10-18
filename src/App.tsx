import { useCallback, useState } from 'react';
import { css } from '@linaria/core';

const centerStyle = css`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const buttonStyle = css`
  font-size: 18px;
  padding: 8px;

  outline: none;
  border: transparent solid 4px;
  border-radius: 8px;
  background: rgba(45, 45, 45, 0.2);

  transition: all 0.25s;

  &:hover {
    border-radius: 0px;
    border-color: rgba(45, 45, 45, 0.5);
    background: rgba(45, 45, 45, 0.3);
  }

  &:active {
    background: rgba(45, 45, 45, 0.5);
  }
`;

function App() {
  const [text, setText] = useState('Hello, world!');

  const onChangeText = useCallback(() => {
    setText((it) => {
      if (it === 'Hello, world!') {
        return '반갑습니다';
      }

      return 'Hello, world!';
    });
  }, []);

  return (
    <div className={centerStyle}>
      <h1>{text}</h1>
      <button className={buttonStyle} onClick={onChangeText}>
        Change
      </button>
    </div>
  );
}

export default App;
