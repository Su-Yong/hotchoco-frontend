import { UserColor } from '../UserColor';
import { variable } from '../variable';

export const DefaultUserColor: UserColor = {
  Primary: {
    Main: variable('Color.Blue.500'),
    Text: variable('Color.Grey.100'),
    Container: variable('Color.Blue.300'),
  },
  Secondary: {
    Main: variable('Color.Grey.900'),
    Text: variable('Color.Grey.100'),
    Container: variable('Color.Grey.700'),
  },
  Tertiary: {
    Main: variable('Color.Grey.500'),
    Text: variable('Color.Grey.100'),
    Container: variable('Color.Grey.300'),
  },
  Success: {
    Main: variable('Color.Green.500'),
    Text: variable('Color.Green.100'),
    Container: variable('Color.Green.300'),
  },
  Warning: {
    Main: variable('Color.Yellow.500'),
    Text: variable('Color.Yellow.100'),
    Container: variable('Color.Yellow.300'),
  },
  Danger: {
    Main: variable('Color.Red.500'),
    Text: variable('Color.Red.100'),
    Container: variable('Color.Red.300'),
  },

  Light: '#fafafa',
  Dark: '#252525',
};
