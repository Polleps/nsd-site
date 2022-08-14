import { styled, theme } from '../../../stitches.config';

export const Card = styled('div', {
  backgroundColor: theme.colors.backgroundGrayTransparantPlain,

  '@supports (backdrop-filter: blur(10px))': {
    backgroundColor: theme.colors.backgroundGrayTransparantBlur,
    backdropFilter: 'blur(20px)',
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
  },
  defaultVariants: {
    type: 'simple',
  },
});
