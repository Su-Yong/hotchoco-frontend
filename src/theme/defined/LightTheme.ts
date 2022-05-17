import type { Animation as AnimationType } from '../Animation';
import { ColorSheet } from '../ColorSheet';
import { Size } from '../Size';
import { Theme } from '../theme';

export const LightColorSheet: ColorSheet = {
  WHITE: '#f8fafc',
  BLACK: '#0a0509',

  Grey: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  Red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  Green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  Blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  Transparency: {
    transparent: 0,
    clear: 0.25,
    translucent: 0.5,
    vague: 0.75,
    opaque: 1,
  }
};

export const DefaultDarkColorSheet: ColorSheet = {
  WHITE: '#f8fafc',
  BLACK: '#0a0509',

  Grey: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  Red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  Green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  Blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  Transparency: {
    transparent: 0,
    clear: 0.25,
    translucent: 0.5,
    vague: 0.75,
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
    medium: '32px',
    large: '48px',
  },
  space: {
    small: '4px',
    medium: '8px',
    large: '16px',
  }
};

export const LightTheme: Theme ={
  Color: LightColorSheet,
  Animation,
  Size: SizeSheet,
};
