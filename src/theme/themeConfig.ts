export type ThemeType = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  primaryBG: string;
  background: string;
  inActive: string;
  iconBackground: string;
  darkblue: string;
  cartButton: string;
  secondaryBG: string;
  text: string;
}

export const lightTheme: ThemeColors = {
  primary: '#704F38',
  background: '#FFFFFF',
  primaryBG: '#FDF2D2',
  secondaryBG: '#2E3240',
  inActive: '#E7E6E3',
  iconBackground: '#BBD9E4',
  darkblue: '#114A4A',
  cartButton: '#D1FBB9',
  text: '#000',
};

export const darkTheme: ThemeColors = {
  primary: '#704F38',
  background: '#FFFFFF',
  primaryBG: '#FDF2D2',
  secondaryBG: '#2E3240',
  inActive: '#E7E6E3',
  iconBackground: '#BBD9E4',
  darkblue: '#114A4A',
  cartButton: '#D1FBB9',
  text: '#000',
};

export type ThemeColorKey = keyof ThemeColors;
