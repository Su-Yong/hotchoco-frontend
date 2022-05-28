export type Color = string;

export interface ColorPalette {
  50?: Color;
  100: Color;
  200: Color;
  300: Color;
  400: Color;
  500: Color;
  600: Color;
  700: Color;
  800: Color;
  900: Color;
}

export interface TransparenceSheet {
  transparent: number;
  clear: number;
  translucent: number;
  vague: number;
  opaque: number;
}

export interface ColorSheet {
  WHITE: Color;
  BLACK: Color;

  Grey: ColorPalette;

  Red: ColorPalette;
  Yellow: ColorPalette;
  Green: ColorPalette;
  Blue: ColorPalette;

  Transparency: TransparenceSheet;
}
