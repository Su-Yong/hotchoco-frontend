import { Animation } from '../Animation';
import { ColorSheet } from '../ColorSheet';
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
};

const Animation: Animation = {
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
    in: 'in',
    out: 'out',
    inOut: 'in-out',
    acceleration: 'cubic-bezier(0.5, 0, 1, 0.5)',
    deceleration: 'cubic-bezier(0, 0.5, 0.5, 1)',
  },
};

export const DarkTheme: Theme ={
  Color: DarkColorSheet,
  Animation,
};
