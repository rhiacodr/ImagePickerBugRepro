import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../contexts/theme";

/**
 * Hook for creating theme-aware styles
 * Usage: const styles = useThemedStyles(createStyles);
 */
export const useThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  createStyles: (colors: any, isDark: boolean) => T
): T => {
  const { colors, isDark } = useTheme();

  return useMemo(() => createStyles(colors, isDark), [colors, isDark]);
};

/**
 * Helper to create responsive styles based on theme
 */
export const createThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  createStyles: (colors: any, isDark: boolean) => T
) => {
  return (colors: any, isDark: boolean): T => {
    return StyleSheet.create(createStyles(colors, isDark));
  };
};

export default useThemedStyles;
