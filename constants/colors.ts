/**
 * Base color palette - Brand colors that remain consistent across themes
 */
export const BASE_COLORS = {
  PRIMARY: {
    DARK_GREEN: "#2D7A4B",
    MEDIUM_GREEN: "#4A9B6B",
    LIGHT_GREEN: "#6BB584",
    ORANGE: "#F59E0B",
    LIGHT_ORANGE: "#FB923C",
    DARKER_ORANGE: "#EA580C",
  },
  ACCENT: {
    SUCCESS: "#10B981", // Success Green
    ALERT: "#F97316", // Alert Orange
    ERROR: "#EF4444", // Error Red
    CONSUMED: "#8B5CF6", // Violet for consumed items
  },
};

/**
 * Light theme color palette - Enhanced for modern, engaging UI
 */
export const LIGHT_COLORS = {
  // Backgrounds - Enhanced with subtle gradients and depth
  BACKGROUND: {
    PRIMARY: "#FAFCFE", // Slightly tinted white for warmth
    SECONDARY: "#F0F9F4", // Soft green tint instead of cream
    TERTIARY: "#E8F5E8", // Enhanced light green BG
    CARD: "#FFFFFF",
    MODAL: "#FFFFFF",
    GRADIENT_START: "#FAFCFE", // For subtle gradient effects
    GRADIENT_END: "#F8FAFC", // Subtle depth
  },
  // Text colors - More engaging and modern
  TEXT: {
    PRIMARY: "#0F1419", // Richer, deeper black
    SECONDARY: "#4B5563", // Stronger secondary text
    TERTIARY: "#8B8B8B", // Warmer tertiary
    INVERSE: "#FFFFFF",
    ACCENT: BASE_COLORS.PRIMARY.DARK_GREEN,
  },
  // Border colors - Subtle but defined
  BORDER: {
    PRIMARY: "#E0E7E7", // Subtle green tint
    SECONDARY: "#C8D4D4", // More defined borders
    FOCUS: BASE_COLORS.PRIMARY.MEDIUM_GREEN,
    SUBTLE: "#F1F5F9", // Very light borders for subtle separation
  },
  // Interactive elements - More vibrant
  INTERACTIVE: {
    PRIMARY: BASE_COLORS.PRIMARY.DARK_GREEN,
    SECONDARY: BASE_COLORS.PRIMARY.MEDIUM_GREEN,
    DISABLED: "#C8D4D4",
    PRESSED: "#1F5A37",
    HOVER: "#E0F2E8", // Light hover state
  },
  // Status colors - Enhanced for better visibility and engagement
  STATUS: {
    SUCCESS: "#059669", // Deeper, more vibrant green
    ALERT: "#D97706", // Richer orange
    ERROR: "#DC2626", // Stronger red
    CONSUMED: "#7C3AED", // More vibrant purple
  },
};

/**
 * Dark theme color palette
 */
export const DARK_COLORS = {
  // Backgrounds
  BACKGROUND: {
    PRIMARY: "#111827", // Very dark
    SECONDARY: "#1F2937", // Dark Gray
    TERTIARY: "#374151", // Medium Gray
    CARD: "#1F2937",
    MODAL: "#1F2937",
    GRADIENT_START: "#111827", // For gradient effects
    GRADIENT_END: "#1F2937", // Subtle depth
  },
  // Text colors
  TEXT: {
    PRIMARY: "#F9FAFB", // Almost white
    SECONDARY: "#D1D5DB",
    TERTIARY: "#9CA3AF",
    INVERSE: "#1F2937",
    ACCENT: BASE_COLORS.PRIMARY.LIGHT_GREEN,
  },
  // Border colors
  BORDER: {
    PRIMARY: "#374151",
    SECONDARY: "#4B5563",
    FOCUS: BASE_COLORS.PRIMARY.LIGHT_GREEN,
    SUBTLE: "#2D3748", // Very subtle borders
  },
  // Interactive elements
  INTERACTIVE: {
    PRIMARY: BASE_COLORS.PRIMARY.MEDIUM_GREEN,
    SECONDARY: BASE_COLORS.PRIMARY.LIGHT_GREEN,
    DISABLED: "#4B5563",
    PRESSED: BASE_COLORS.PRIMARY.DARK_GREEN,
    HOVER: "#2D3748", // Dark hover state
  },
  // Status colors (slightly adjusted for dark mode)
  STATUS: {
    SUCCESS: "#34D399", // Brighter green for dark mode
    ALERT: "#FBBF24", // Brighter yellow for dark mode
    ERROR: "#F87171", // Brighter red for dark mode
    CONSUMED: "#A78BFA", // Brighter violet for dark mode
  },
};

/**
 * Theme-aware color system
 */
export type ThemeColors = typeof LIGHT_COLORS;

export const getThemeColors = (isDark: boolean): ThemeColors => {
  return isDark ? DARK_COLORS : LIGHT_COLORS;
};

/**
 * Legacy color export for backward compatibility
 * @deprecated Use getThemeColors() instead
 */
export const COLORS = {
  PRIMARY: BASE_COLORS.PRIMARY,
  SUPPORTING: {
    CREAM: "#F7F3E9",
    WHITE: "#FFFFFF",
    LIGHT_GREEN_BG: "#E5F3E8",
    DARK_GRAY: "#1F2937",
  },
  ACCENT: BASE_COLORS.ACCENT,
};

/**
 * Expiry status color codes - Theme aware
 */
export const getExpiryColors = (isDark: boolean) => {
  const colors = getThemeColors(isDark);
  return {
    EXPIRED: colors.STATUS.ERROR,
    EXPIRES_SOON: colors.STATUS.ALERT,
    GOOD: colors.STATUS.SUCCESS,
    CONSUMED: colors.STATUS.CONSUMED,
  };
};

/**
 * Legacy expiry colors for backward compatibility
 * @deprecated Use getExpiryColors() instead
 */
export const EXPIRY_COLORS = {
  EXPIRED: BASE_COLORS.ACCENT.ERROR,
  EXPIRES_SOON: BASE_COLORS.ACCENT.ALERT,
  GOOD: BASE_COLORS.ACCENT.SUCCESS,
  CONSUMED: BASE_COLORS.ACCENT.CONSUMED,
};
