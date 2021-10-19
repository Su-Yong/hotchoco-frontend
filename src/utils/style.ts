import { CSSProperties } from 'react';

type Style = CSSProperties | undefined;

const style = (...styles: Style[]): CSSProperties => {
  const result = styles.filter((it) => it).reduce((prev, curr) => ({ ...prev, ...curr }), {});

  if (result) {
    return result;
  }

  return {};
};

export default style;
