import { styled, theme } from '../../../stitches.config';

export const Container = styled('div', {
  padding: theme.sizes.md,
  maxWidth: '100%',

  '@md': {
    padding: '0px',
    width: 'min(85%, 800px)',
    margin: '0 auto',
  },

  variants: {
    size: {
      large: {
        '@md': {
          width: 'min(85%, 1600px)',
        },
      },
    },
  },
});
