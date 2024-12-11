import type { Theme } from '@mui/material/styles';

import { extendTheme } from '@mui/material/styles';

import { shadows, typography, components, colorSchemes, customShadows } from './core';
import { setFont } from './styles';
import { teal } from '@mui/material/colors';

export const primaryColors = {
  blue: {
    light: { main: '#42a5f5', light: '#80d6ff', dark: '#1565c0', contrastText: '#ffffff' },
    dark: { main: '#90caf9', light: '#42a5f5', dark: '#1565c0', contrastText: '#000000' }, // for dark mode
  },
  red: {
    light: { main: '#d32f2f', light: '#ef5350', dark: '#c62828', contrastText: '#ffffff' },
    dark: { main: '#ef9a9a', light: '#ef5350', dark: '#c62828', contrastText: '#000000' }, // for dark mode
  },
  green: {
    light: { main: '#388e3c', light: '#66bb6a', dark: '#2e7d32', contrastText: '#ffffff' },
    dark: { main: '#81c784', light: '#66bb6a', dark: '#2e7d32', contrastText: '#000000' }, // for dark mode
  },
  orange: {
    light: { main: '#f57c00', light: '#ffa726', dark: '#ef6c00', contrastText: '#ffffff' },
    dark: { main: '#ffb74d', light: '#ffa726', dark: '#ef6c00', contrastText: '#000000' }, // for dark mode
  },
  metalBlue: {
    light: { main: '#405189', light: '#a0abc7', dark: '#262d58', contrastText: '#e0db5d' },
    dark: { main: '#ffb74d', light: '#ffa726', dark: '#ef6c00', contrastText: '#000000' }, // for dark mode
  },
  teal: {
    light: { main: teal[600], light: teal[200], dark: teal[900], contrastText: '#ffffff' },
    dark: { main: '#ffb74d', light: '#ffa726', dark: '#ef6c00', contrastText: '#000000' }, // for dark mode
  },
};

export const fontFamilies = {
  poppins: setFont('Poppins'),
  lato:setFont('Lato'),
  ubuntu: setFont('Ubuntu'),
  roboto: setFont('Roboto'),
  OpenSans: setFont('Open Sans'),
  montserrat: setFont('Montserrat'),
};

export function createTheme(selectedPalette: 'light' | 'dark' = 'light', primaryColor: keyof typeof primaryColors = 'blue', secondaryColor: keyof typeof primaryColors = 'green', fontFamily: keyof typeof fontFamilies = 'roboto'): Theme {

  const basePalette = colorSchemes[selectedPalette]?.palette;
  
  const primary = primaryColors[primaryColor][selectedPalette];
  const secondary = primaryColors[secondaryColor][selectedPalette];

  // ...colorSchemes,
  const initialTheme = {
    colorSchemes: {
      [selectedPalette]: {
        palette: {
          ...basePalette,
          primary,
          secondary
        }
      }
    },
    shadows: shadows(),
    customShadows: customShadows(),
    shape: { borderRadius: 8 },
    components,
    typography: typography(fontFamilies[fontFamily], fontFamilies[fontFamily]),
    cssVarPrefix: '',
    shouldSkipGeneratingVar,
  };

  const theme = extendTheme(initialTheme);

  return theme;
}

// ----------------------------------------------------------------------

function shouldSkipGeneratingVar(keys: string[], value: string | number): boolean {
  const skipGlobalKeys = [
    'mixins',
    'overlays',
    'direction',
    'typography',
    'breakpoints',
    'transitions',
    'cssVarPrefix',
    'unstable_sxConfig',
  ];

  const skipPaletteKeys: {
    [key: string]: string[];
  } = {
    global: ['tonalOffset', 'dividerChannel', 'contrastThreshold'],
    grey: ['A100', 'A200', 'A400', 'A700'],
    text: ['icon'],
  };

  const isPaletteKey = keys[0] === 'palette';

  if (isPaletteKey) {
    const paletteType = keys[1];
    const skipKeys = skipPaletteKeys[paletteType] || skipPaletteKeys.global;

    return keys.some((key) => skipKeys?.includes(key));
  }

  return keys.some((key) => skipGlobalKeys?.includes(key));
}
