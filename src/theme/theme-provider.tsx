import type {} from '@mui/lab/themeAugmentation';
import type {} from '@mui/material/themeCssVarsAugmentation';

import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import { createTheme, fontFamilies, primaryColors } from './create-theme';
import React, { createContext, useContext, useState } from 'react';

// ----------------------------------------------------------------------



const fontSizes = {
  small: '12px',
  medium: '14px',
  large: '16px',
};

type ThemeContextType = {
  mode: 'light' | 'dark';
  primaryColor: keyof typeof primaryColors;
  secondaryColor: keyof typeof primaryColors;
  fontFamily: keyof typeof fontFamilies;
  fontSize: keyof typeof fontSizes;
  isElagant: boolean,
  toggleElagant: () => void;
  toggleMode: () => void;
  setPrimaryColor: (color: keyof typeof primaryColors) => void;
  setSecondaryColor: (color: keyof typeof primaryColors) => void;
  setFontFamily: (font: keyof typeof fontFamilies) => void;
  setFontSize: (size: keyof typeof fontSizes) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {

  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [primaryColor, setPrimaryColor] = useState<keyof typeof primaryColors>('blue');
  const [secondaryColor, setSecondaryColor] = useState<keyof typeof primaryColors>('green');
  const [fontFamily, setFontFamily] = useState<keyof typeof fontFamilies>('roboto');
  const [fontSize, setFontSize] = useState<keyof typeof fontSizes>('medium');
  const [isElagant, setisElagant] = useState(true);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const toggleElagant = () => {
    setisElagant((prevMode) => !prevMode);
  };

  const themeContextValue = {
    mode,
    primaryColor,
    secondaryColor,
    fontFamily,
    fontSize,
    isElagant,
    toggleMode,
    setPrimaryColor,
    setSecondaryColor,
    setFontFamily,
    setFontSize,
    toggleElagant
  };

  const theme = createTheme(mode, primaryColor,secondaryColor, fontFamily);

  return (
    <ThemeContext.Provider value={themeContextValue}>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
