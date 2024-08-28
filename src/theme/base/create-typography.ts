import type { TypographyOptions } from '@mui/material/styles/createTypography';

export const createTypography = (): TypographyOptions => {
  return {
    fontFamily: '"Mukta"',
    body1: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.5 },
    body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
    },
    h1: { fontSize: '2rem', fontWeight: 700, lineHeight: 3 },
    h2: { fontSize: '1.5rem', fontWeight: 700, lineHeight: 3 },
    h3: { fontSize: '1rem', fontWeight: 800, lineHeight: 1.5 },
    h4: { fontSize: '1rem', fontWeight: 700, lineHeight: 1.5 },
    h5: { fontSize: '0.875rem', fontWeight: 700, lineHeight: 1.5 },
    h6: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 },
  };
};
