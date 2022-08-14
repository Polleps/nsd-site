import type { CSS } from '@stitches/react';

export const createVars = (props: Record<string, unknown>): CSS =>
  Object.entries(props).reduce((acc, [ key, value ]) => ({
    ...acc,
    [`--${key}`]: value,
  }), {});
