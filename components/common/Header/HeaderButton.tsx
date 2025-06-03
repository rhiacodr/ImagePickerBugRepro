import React from "react";
import {
  AccessibilityRole,
  StyleSheet,
  Pressable,
  View,
  Platform,
} from "react-native";
import ThemedIcon from "../ThemedIcon";
import { useTheme } from "../../../contexts/theme";

type Props = {
  iconName: string;
  color?: string;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  onPress?: () => void;
};

const HeaderButton = ({
  iconName,
  color,
  accessibilityLabel,
  accessibilityRole,
  onPress,
}: Props) => {
  // Get theme colors from context
  const { colors, isDark } = useTheme();

  // Use provided color or default to theme's primary interactive color
  const iconColor = color || colors.INTERACTIVE.PRIMARY;

  // Determine background colors for different states based on theme
  const bgColorNormal = isDark
    ? "rgba(255, 255, 255, 0.07)"
    : "rgba(255, 255, 255, 0.98)"; // Slightly off-white for a crisper look in light mode

  const bgColorPressed = isDark
    ? "rgba(255, 255, 255, 0.15)"
    : "rgba(0, 0, 0, 0.06)"; // Slightly stronger pressed state

  // Border colors with proper theme awareness
  const borderColor = isDark
    ? `${colors.BORDER.SUBTLE}80`
    : `${colors.BORDER.PRIMARY}60`; // More defined but still subtle border for light mode

  // Shadow colors adjusted for theme
  const shadowColor = isDark ? "rgba(0, 0, 0, 0.65)" : "rgba(0, 0, 0, 0.12)";

  // Function to determine if we should use high contrast
  const shouldUseHighContrast = () => {
    // High contrast mode for specific icons or based on theme
    return iconName === "add" || iconName === "trash";
  };

  // Enhanced icon color based on high contrast needs
  const enhancedIconColor =
    shouldUseHighContrast() && !color
      ? isDark
        ? colors.TEXT.PRIMARY
        : colors.INTERACTIVE.PRIMARY
      : iconColor;

  // Build container style with platform-specific UI enhancements
  const containerStyle = [
    styles.container,
    {
      borderColor,
      shadowColor,
      backgroundColor: bgColorNormal,
    },
    // iOS light mode crisp styling
    Platform.OS === "ios" &&
      !isDark && {
        borderColor: `${colors.BORDER.PRIMARY}70`, // Slightly more visible border
        borderWidth: 0.5, // Thin border for definition
        backgroundColor: "rgba(255, 255, 255, 0.98)", // Near-white background
      },
    // Android-specific styling with API level awareness
    Platform.OS === "android" && {
      ...styles.androidContainer,
      // Add special styling for Android light mode
      ...(!isDark && styles.androidLightContainer),
      // Android ripple doesn't work well with borders on some versions
      // so we apply different styling based on whether it's a critical action
      elevation: shouldUseHighContrast() 
        ? isDark ? 4 : 6  // Higher elevation for important actions
        : isDark ? 3 : 4, // Standard elevation, higher in light mode for visibility
      backgroundColor:
        shouldUseHighContrast() && !color
          ? isDark
            ? "rgba(255, 255, 255, 0.12)" // More visible background for important buttons in dark mode
            : "rgba(252, 252, 252, 1)" // Pure white for important buttons in light mode
          : isDark 
            ? bgColorNormal
            : "#FFFFFF", // Pure white for better contrast in light mode
    },
  ];

  // Android Material Design-inspired ripple config
  const androidRippleConfig = {
    color: isDark
      ? "rgba(255, 255, 255, 0.32)" // Higher contrast for dark mode
      : "rgba(0, 0, 0, 0.25)", // More visible in light mode
    borderless: false,
    foreground: true,
    radius: 20, // Slightly larger ripple for better touch feedback
  };

  return (
    <View style={containerStyle}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.pressableContent,
          Platform.OS === "ios" &&
            pressed && {
              backgroundColor: bgColorPressed,
              opacity: isDark ? 1 : 0.92, // Slightly reduced opacity on press for crisper feedback
            },
          // Add subtle hover-like effect in light mode when not pressed
          Platform.OS === "ios" &&
            !isDark &&
            !pressed && {
              backgroundColor: "rgba(255, 255, 255, 0.99)", // Very subtle background
            },
          // Android light mode styling
          Platform.OS === "android" &&
            !isDark && {
              borderRadius: 6, // Slightly sharper corners for better definition
            },
        ]}
        accessibilityLabel={accessibilityLabel || `${iconName} button`}
        accessibilityRole={accessibilityRole || "button"}
        accessibilityHint={`Activates ${iconName} action`}
        android_ripple={androidRippleConfig}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <ThemedIcon
          name={iconName as any}
          size={Platform.OS === "android" ? 26 : 24} // Larger icon on Android for better visibility
          color={Platform.OS === "android" && !isDark && shouldUseHighContrast() 
            ? colors.INTERACTIVE.PRESSED // Use a stronger color for better visibility on Android light mode
            : enhancedIconColor
          }
          showBackground={Platform.OS === "ios"} // Only use background on iOS, Android uses ripple
          style={Platform.OS === "android" 
            ? {
                marginTop: 1, 
                ...(shouldUseHighContrast() && !isDark ? { opacity: 0.92 } : {}), // Slightly adjust opacity for critical icons
              } 
            : undefined} // Slight adjustment for Android vertical alignment
        />
      </Pressable>
    </View>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10, // Slightly smaller radius for a crisper look
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 0.5,
    overflow: "hidden", // Ensure ripple effect is contained within borders
    ...(Platform.OS === "ios" && {
      // iOS-specific enhancements for light mode
      shadowOffset: { width: 0, height: 0.5 },
      shadowOpacity: 0.12, // Subtler shadow for a cleaner look
      shadowRadius: 1.5, // Tighter shadow spread
    }),
  },
  androidContainer: {
    elevation: 4, // Increased elevation for more visible shadow
    borderRadius: 8, // Slightly smaller radius for Android Material Design look
  },
  androidLightContainer: {
    borderWidth: 0.7, // Add a visible border for Android light mode
    borderColor: "#00000025", // Light gray border that's visible but not too stark
    backgroundColor: "#FFFFFF", // Pure white background for better contrast
  },
  pressableContent: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 8,
    overflow: "hidden", // Ensures content stays within bounds
  },
});
