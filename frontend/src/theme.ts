import { createTheme } from '@mui/material/styles';

// Design system tokens from design.json
const designTokens = {
  colors: {
    background: '#000000',
    surface: 'rgba(255, 255, 255, 0.05)',
    primary: '#FFFFFF',
    primaryVariant: '#CCCCCC',
    secondary: '#AAAAAA',
    border: 'rgba(255, 255, 255, 0.2)',
    accent: '#FFFFFF',
    textPrimary: '#FFFFFF',
    textSecondary: '#CCCCCC',
    textOnPrimary: '#000000',
    shadow: 'rgba(255, 255, 255, 0.1)'
  },
  typography: {
    fontFamily: '"Fira Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    sizes: {
      h1: 24,
      h2: 20,
      body: 16,
      small: 14,
      caption: 12
    },
    weights: {
      regular: 400,
      medium: 500,
      bold: 600
    },
    lineHeights: {
      h1: 32,
      body: 24,
      small: 20
    }
  },
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  radii: {
    sm: 4,
    md: 8,
    lg: 16,
    pill: 9999
  },
  shadows: {
    level1: '0px 1px 3px rgba(255,255,255,0.1)',
    level2: '0px 4px 8px rgba(255,255,255,0.1)'
  }
};

const theme = createTheme({
  palette: {
    primary: {
      main: designTokens.colors.primary,
      light: designTokens.colors.primaryVariant,
      dark: designTokens.colors.primaryVariant,
    },
    secondary: {
      main: designTokens.colors.secondary,
      light: designTokens.colors.secondary,
      dark: designTokens.colors.secondary,
    },
    background: {
      default: designTokens.colors.surface,
      paper: designTokens.colors.background,
    },
    text: {
      primary: designTokens.colors.textPrimary,
      secondary: designTokens.colors.textSecondary,
    },
    divider: designTokens.colors.border,
  },
  typography: {
    fontFamily: designTokens.typography.fontFamily,
    h1: {
      fontSize: designTokens.typography.sizes.h1,
      fontWeight: designTokens.typography.weights.bold,
      lineHeight: designTokens.typography.lineHeights.h1 / designTokens.typography.sizes.h1,
      color: designTokens.colors.textPrimary,
    },
    h2: {
      fontSize: designTokens.typography.sizes.h2,
      fontWeight: designTokens.typography.weights.bold,
      lineHeight: designTokens.typography.lineHeights.body / designTokens.typography.sizes.h2,
      color: designTokens.colors.textPrimary,
    },
    h3: {
      fontSize: designTokens.typography.sizes.h1,
      fontWeight: designTokens.typography.weights.bold,
      lineHeight: designTokens.typography.lineHeights.h1 / designTokens.typography.sizes.h1,
      color: designTokens.colors.textPrimary,
    },
    h6: {
      fontSize: designTokens.typography.sizes.h2,
      fontWeight: designTokens.typography.weights.bold,
      lineHeight: designTokens.typography.lineHeights.body / designTokens.typography.sizes.h2,
      color: designTokens.colors.textPrimary,
    },
    body1: {
      fontSize: designTokens.typography.sizes.body,
      fontWeight: designTokens.typography.weights.regular,
      lineHeight: designTokens.typography.lineHeights.body / designTokens.typography.sizes.body,
      color: designTokens.colors.textPrimary,
    },
    body2: {
      fontSize: designTokens.typography.sizes.small,
      fontWeight: designTokens.typography.weights.regular,
      lineHeight: designTokens.typography.lineHeights.small / designTokens.typography.sizes.small,
      color: designTokens.colors.textSecondary,
    },
    caption: {
      fontSize: designTokens.typography.sizes.caption,
      fontWeight: designTokens.typography.weights.regular,
      color: designTokens.colors.textSecondary,
    },
  },
  spacing: designTokens.spacing.sm,
  shape: {
    borderRadius: designTokens.radii.md,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: designTokens.typography.fontFamily,
          backgroundColor: designTokens.colors.surface,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: designTokens.radii.lg,
          fontFamily: designTokens.typography.fontFamily,
          fontSize: designTokens.typography.sizes.body,
          fontWeight: designTokens.typography.weights.medium,
          padding: `${designTokens.spacing.sm}px ${designTokens.spacing.lg}px`,
          boxShadow: designTokens.shadows.level1,
          '&:hover': {
            boxShadow: designTokens.shadows.level2,
          },
        },
        contained: {
          backgroundColor: designTokens.colors.primary,
          color: designTokens.colors.textOnPrimary,
          '&:hover': {
            backgroundColor: designTokens.colors.primaryVariant,
          },
        },
        outlined: {
          backgroundColor: designTokens.colors.surface,
          color: designTokens.colors.primary,
          borderColor: designTokens.colors.primary,
          borderRadius: designTokens.radii.md,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: designTokens.radii.md,
            backgroundColor: designTokens.colors.background,
            fontFamily: designTokens.typography.fontFamily,
            fontSize: designTokens.typography.sizes.body,
            '& fieldset': {
              borderColor: designTokens.colors.border,
            },
            '&:hover fieldset': {
              borderColor: designTokens.colors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: designTokens.colors.primary,
            },
          },
          '& .MuiInputLabel-root': {
            fontFamily: designTokens.typography.fontFamily,
            fontSize: designTokens.typography.sizes.body,
            color: designTokens.colors.textSecondary,
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiFormLabel-root': {
            fontFamily: designTokens.typography.fontFamily,
            fontSize: designTokens.typography.sizes.body,
            fontWeight: designTokens.typography.weights.medium,
            color: designTokens.colors.textPrimary,
            marginBottom: designTokens.spacing.xs,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.radii.md,
          backgroundColor: designTokens.colors.background,
          fontFamily: designTokens.typography.fontFamily,
          fontSize: designTokens.typography.sizes.body,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: designTokens.colors.border,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: designTokens.colors.primary,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: designTokens.colors.primary,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.radii.lg,
          backgroundColor: designTokens.colors.surface,
          boxShadow: designTokens.shadows.level1,
        },
        elevation3: {
          boxShadow: designTokens.shadows.level2,
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: designTokens.colors.primary,
          '& .MuiRating-iconFilled': {
            color: designTokens.colors.primary,
          },
          '& .MuiRating-iconHover': {
            color: designTokens.colors.primaryVariant,
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: designTokens.colors.border,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: designTokens.spacing.md,
          paddingRight: designTokens.spacing.md,
          '@media (min-width: 600px)': {
            paddingLeft: designTokens.spacing.lg,
            paddingRight: designTokens.spacing.lg,
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: designTokens.colors.primary,
        },
      },
    },
  },
});

export default theme; 