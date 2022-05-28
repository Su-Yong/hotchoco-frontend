import type { Animation as AnimationType } from '../Animation';
import { ColorSheet } from '../ColorSheet';
import { Size } from '../Size';
import { Theme } from '../theme';

export const DarkColorSheet: ColorSheet = {
  WHITE: '#111827',
  BLACK: '#f8fafc',

  Grey: {
    900: '#f1f5f9',
    800: '#e2e8f0',
    700: '#cbd5e1',
    600: '#94a3b8',
    500: '#64748b',
    400: '#475569',
    300: '#334155',
    200: '#1e293b',
    100: '#0f172a',
  },

  Red: {
    900: '#fee2e2',
    800: '#fecaca',
    700: '#fca5a5',
    600: '#f87171',
    500: '#ef4444',
    400: '#dc2626',
    300: '#b91c1c',
    200: '#991b1b',
    100: '#7f1d1d',
  },

  Yellow: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },

  Green: {
    900: '#dcfce7',
    800: '#bbf7d0',
    700: '#86efac',
    600: '#4ade80',
    500: '#22c55e',
    400: '#16a34a',
    300: '#15803d',
    200: '#166534',
    100: '#14532d',
  },

  Blue: {
    900: '#dbeafe',
    800: '#bfdbfe',
    700: '#93c5fd',
    600: '#60a5fa',
    500: '#3b82f6',
    400: '#2563eb',
    300: '#1d4ed8',
    200: '#1e40af',
    100: '#1e3a8a',
  },

  Transparency: {
    transparent: 0,
    clear: 0.35,
    translucent: 0.65,
    vague: 0.85,
    opaque: 1,
  },
};

const Animation: AnimationType = {
  duration: {
    shortest: '150ms',
    shorter: '250ms',
    short: '350ms',
    medium: '500ms',
    long: '1000ms',
    longer: '1500ms',
    longest: '3000ms',
  },
  easing: {
    linear: 'linear',
    in: 'in',
    out: 'out',
    inOut: 'in-out',
    acceleration: 'cubic-bezier(0.5, 0, 1, 0.5)',
    deceleration: 'cubic-bezier(0, 0.5, 0.5, 1)',
    inBack: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
    outBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

const SizeSheet: Size = {
  text: {
    head: '1.25rem',
    title: '1.125rem',
    subtitle: '1rem',
    body: '0.875rem',
    caption: '0.75rem',
    info: '0.625rem',
  },
  icon: {
    small: '24px',
    medium: '36px',
    large: '48px',
  },
  space: {
    small: '4px',
    medium: '8px',
    large: '16px',
  }
};

export const DarkTheme: Theme ={
  Color: DarkColorSheet,
  Animation,
  Size: SizeSheet,
};
