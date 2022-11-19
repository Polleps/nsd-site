import { theme, styled } from '../stitches.config';

export const Button = styled('a', {
  'span': {
    backgroundImage: theme.colors.gradientMain,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.sizes.md} calc(${theme.sizes.xl} * 1.5)`,
    borderRadius: theme.radii.main,
    fontSize: theme.fontSizes.large,
    fontWeight: theme.fontWeights.medium,
  },
  '&::before': {
    backgroundImage: theme.colors.gradientMain,
    content: '""',
    display: 'block',
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: theme.radii.main,
    zIndex: -1,
    transitionShort: [ 'filter' ],
    opacity: 0.8,
  },
  '&:hover, &:focus': {
    '&::before': {
      filter: 'blur(10px)',
    },
    filter: 'brightness(1.3)',
  },
  position: 'relative',
  transitionShort: [ 'filter' ],
});
