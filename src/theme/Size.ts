export interface TextSize {
  head: string;
  title: string;
  subtitle: string;
  body: string;
  caption: string;
  info: string;
}

export interface IconSize {
  small: string;
  medium: string;
  large: string;
}

export interface SpaceSize {
  small: string;
  medium: string;
  large: string;
}

export interface Size {
  text: TextSize;
  icon: IconSize;
  space: SpaceSize;
};
