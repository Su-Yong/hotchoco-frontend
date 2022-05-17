import { variable } from '@/theme';
import { css, cx } from '@linaria/core';
import { Component, createEffect, createSignal, splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { model, useDirective } from '@/utils/directives';
import { sx } from '@/utils';
useDirective(model);

const inputStyle = css`
  --box-shadow-color: var(--secondary-color);

  outline: none;
  border-radius: 0;
  border: 0 solid transparent;

  -webkit-appearance: none;
  box-shadow: 0 -4px 0 -2px var(--box-shadow-color) inset;

  padding: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: var(--text-color);
  background: var(--background-color);

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.inOut')};

  &:hover {
    background: var(--background-hover-color);
  }

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

const TextInput: Component<TextInputProps> = (props) => {
  const [local, leftProps] = splitProps(props, ['disabled', 'children']);

  const [text, setText ] = createSignal('');

  const textColor = () => local.disabled ? variable('Color.Grey.500') : variable('Color.BLACK');
  const mainColor = () => local.disabled ? variable('Color.Grey.200') : variable('Color.Blue.500');
  const secondaryColor = () => local.disabled ? variable('Color.Grey.300') : variable('Color.Grey.500');
  const backgroundColor = () => local.disabled ? variable('Color.Grey.100') : variable('Color.Grey.200');
  const backgroundHoverColor = () => local.disabled ? variable('Color.Grey.100') : variable('Color.Grey.300');

  return (
    <input
      {...leftProps}
      disabled={local.disabled}
      use:model={[text, setText]}
      className={cx(inputStyle, leftProps.className)}
      style={sx({
        '--text-color': textColor(),
        '--main-color': mainColor(),
        '--secondary-color': secondaryColor(),
        '--background-color': backgroundColor(),
        '--background-hover-color': backgroundHoverColor(),
      }, leftProps.style)}
    />
  );
}

export default TextInput;
