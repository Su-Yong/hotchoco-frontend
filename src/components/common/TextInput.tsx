import { variable } from '@/theme';
import { css, cx } from '@linaria/core';
import { Component, createSignal } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { model, useDirective } from '@/utils/directives';
import { sx } from '@/utils';
useDirective(model);

const inputStyle = css`
  --box-shadow-color: var(--secondary-color);

  outline: none;
  border: 0 solid transparent;
  box-shadow: 0 -4px 0 -2px var(--box-shadow-color) inset;

  padding: 8px;
  background: var(--background-color);

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.inOut')};

  &:focus {
    box-shadow: 0 0 0 2px var(--box-shadow-color) inset;
  }

  &:invalid {
    --box-shadow-color: ${variable('Color.Red.500')};
  }
  &:focus:valid {
    --box-shadow-color: var(--main-color);
  }
`;

export interface TextInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  
}

const TextInput: Component<TextInputProps> = ({
  disabled,
  children,
  ...props
}) => {
  const [text, setText ] = createSignal('');

  const mainColor = disabled ? variable('Color.Grey.200') : variable('Color.Blue.500');
  const secondaryColor = disabled ? variable('Color.Grey.300') : variable('Color.Grey.500');
  const backgroundColor = disabled ? variable('Color.Grey.100') : variable('Color.Grey.200');

  return (
    <input
      {...props}
      disabled={disabled}
      use:model={[text, setText]}
      className={cx(inputStyle, props.className)}
      style={sx({
        '--main-color': mainColor,
        '--secondary-color': secondaryColor,
        '--background-color': backgroundColor,
      }, props.style)}
    />
  );
}

export default TextInput;
