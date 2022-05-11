import { Animation } from '../Animation';
import { ColorSheet } from '../ColorSheet';
import { Theme } from '../theme';

export const DarkColorSheet: ColorSheet = {
  WHITE: '#0a0509',
  BLACK: '#f8fafc',

  Grey: {
    900: '#f8fafc',
    800: '#f1f5f9',
    700: '#e2e8f0',
    600: '#cbd5e1',
    500: '#94a3b8',
    400: '#64748b',
    300: '#475569',
    200: '#334155',
    100: '#1e293b',
    50: '#0f172a',
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