import { variable } from '@/theme';
import { css, cx } from '@linaria/core';
import { Component, splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { sx } from '@/utils';

const inputStyle = css`
  --box-shadow-color: var(--secondary-color);

  outline: none;
  border-radius: 0;
  border: 0 solid transparent;

  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 -4px 0 -2px var(--box-shadow-color) inset;

  padding: ${variable('Size.space.medium')};
  padding-top: ${variable('Size.space.large')};
  padding-bottom: ${variable('Size.space.large')};
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
    --box-shadow-color: ${variable('Danger.Main')};
  }
  &:focus:valid {
    --box-shadow-color: var(--main-color);
  }
`;

export interface TextInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  
}

const TextInput: Component<TextInputProps> = (props) => {
  const [local, leftProps] = splitProps(props, ['disabled', 'children']);

  const textColor = () => local.disabled ? variable('Color.Grey.500') : variable('Color.BLACK');
  const mainColor = () => local.disabled ? variable('Color.Grey.200') : variable('Primary.Main');
  const secondaryColor = () => local.disabled ? variable('Color.Grey.300') : variable('Color.Grey.500');
  const backgroundColor = () => local.disabled ? variable('Color.Grey.100') : variable('Color.Grey.200');
  const backgroundHoverColor = () => local.disabled ? variable('Color.Grey.100') : variable('Color.Grey.300');

  return (
    <input
      {...leftProps}
      disabled={local.disabled}
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
