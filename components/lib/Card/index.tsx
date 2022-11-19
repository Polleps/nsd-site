import { styled, theme } from '../../../stitches.config';

export const Card = styled('div', {
  backgroundColor: theme.colors.backgroundGrayTransparantPlain,

  '@supports (backdrop-filter: blur(10px))': {
    backgroundColor: theme.colors.backgroundGrayTransparantBlur,
    backdropFilter: 'blur(10px)',
  },
  '@supports (-webkit-backdrop-filter: blur(10px))': {
    backgroundColor: theme.colors.backgroundGrayTransparantBlur,
    '-webkit-backdrop-filter': 'blur(10px)',
  },

  borderRadius: theme.radii.main,
  boxShadow: theme.shadows.main,
  variants: {
    type: {
      simple: {
        padding: theme.sizes.md,
      },
      custom: {
        padding: '0px',
      },
    },
    interaction: {
      true: {
        '&:hover, &:focus': {
          filter: 'brightness(1.1)',
          boxShadow: `${theme.shadows.main}, 0px 0px 0px 2px ${theme.colors.secondary}`,
        },
      },
    },
  },
  defaultVariants: {
    type: 'simple',
    interaction: false,
  },
});
