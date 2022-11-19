import { createStitches } from '@stitches/react';

export const PRIMARY_COLOR = '#0D1334';
export const SECONDARY_COLOR = '#42B271';
export const HTML_THEME_COLOR = '#18393d';
export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      background: '#14151a',
      backgroundLight: '#23252e',
      backgroundTransparent: 'linear-gradient(rgba(27 62 66 / 0.9), $primaryTransparent)',
      backgroundGray: '#181c2c',
      backgroundGrayTransparantBlur: 'rgba(38, 38, 38, 0.3)',
      backgroundGrayTransparantPlain: 'rgba(38, 38, 38, 0.9)',
      backgroundDarkTransparantPlain: 'rgb(10 10 10 / 70%)',
      backgroundDarkTransparantBlur: 'rgb(10 10 10 / 30%)',
      gradientMain: 'linear-gradient(225deg, rgba(69,193,112,1) 0%, rgba(39,51,121,1) 100%)',
      primary: PRIMARY_COLOR,
      primaryLight: '#20284A',
      primaryTransparent: 'rgba(4 13 51 / 89%)',
      text: 'white',
      textLight: '#dfdfdf',
      textDark: '#858585',
      secondary: SECONDARY_COLOR,
      htmlThemeColor: HTML_THEME_COLOR,
      link: '$secondary',
    },
    fonts: {
      main: '\'Montserrat\', sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    },
    fontSizes: {
      small: '.4rem',
      medium: '1rem',
      large: '1.5rem',
      xLarge: '2rem',
      colorHeadings: '2.9rem',
    },
    fontWeights: {
      extraLight: '200',
      regular: '400',
      medium: '500',
      bold: '700',
    },
    sizes: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '2rem',
      xl: 'clamp(2rem, 4vw, 4.4rem)',
    },
    shadows: {
      pressed: '0 1px 7px rgba(0 0 0 / 35%)',
      main: '0 3px 15px rgba(0 0 0 / 25%)',
    },
    radii: {
      main: '20px',
    },
  },
  media: {
    xs: '(min-width: 300px)',
    sm: '(min-width: 600px)',
    md: '(min-width: 900px)',
    lg: '(min-width: 1200px)',
    xl: '(min-width: 1800px)',
    xsDown: '(max-width: 599px)',
    smDown: '(max-width: 899px)',
    mdDown: '(max-width: 1199px)',
    lgDown: '(max-width: 1799px)',
  },
  utils: {
    marginX: (value: string) => ({ marginLeft: value, marginRight: value }),
    transitionShort: (values: string[]) => ({
      transition: values.map((value) => `${value} 100ms ease`).join(', '),
    }),
  },
});
