import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/theme";

type Props = {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  backgroundColor?: string;
  containerSize?: number;
  borderRadius?: number;
  style?: any;
  showBackground?: boolean;
};

const ThemedIcon = ({
  name,
  size = 18,
  color,
  backgroundColor,
  containerSize,
  borderRadius,
  style,
  showBackground = false,
}: Props) => {
  const { colors } = useTheme();
  const isAndroid = Platform.OS === "android";
  const isLightMode =
    colors.BACKGROUND.PRIMARY === "#FFFFFF" ||
    colors.BACKGROUND.PRIMARY.toLowerCase().includes("fff");

  const platformSize = isAndroid ? size + 2 : size;

  // Convert hex to rgba
  const hexToRgba = (hex: string, opacity: number) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return hex;
  };

  // Background color logic
  const getBackground = () => {
    if (backgroundColor) return backgroundColor;
    const base = color && color.startsWith("#") ? color : colors.TEXT.ACCENT;
    if (color) {
      return isLightMode
        ? hexToRgba(base, isAndroid ? 0.12 : 0.15)
        : hexToRgba(base, 0.25);
    }
    return isLightMode
      ? hexToRgba(colors.TEXT.ACCENT, isAndroid ? 0.12 : 0.15)
      : hexToRgba(colors.TEXT.ACCENT, 0.25);
  };

  // Border color for Android
  const getBorderColor = () => {
    const base = color && color.startsWith("#") ? color : colors.TEXT.ACCENT;
    return hexToRgba(base, 0.5);
  };

  // Icon color
  const iconColor = color || colors.TEXT.ACCENT;

  // Container size and radius
  const cSize =
    containerSize || (isAndroid ? platformSize + 22 : platformSize + 18);
  const cRadius =
    borderRadius !== undefined ? borderRadius : isAndroid ? 12 : 10;

  // Container style
  const containerStyle = [
    styles.iconContainer,
    { width: cSize, height: cSize, borderRadius: cRadius },
    showBackground && { backgroundColor: getBackground() },
    isAndroid &&
      isLightMode &&
      showBackground && {
        borderWidth: 1.5,
        borderColor: getBorderColor(),
        borderRadius: 8,
      },
    !isAndroid &&
      isLightMode &&
      showBackground && {
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.8)",
      },
    style,
  ];

  // Icon style
  const iconStyles = [
    isAndroid &&
      isLightMode &&
      showBackground && { opacity: 1, transform: [{ scale: 1.1 }] },
    !isAndroid &&
      isLightMode &&
      showBackground && {
        textShadowColor: "rgba(0, 0, 0, 0.1)",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
      },
  ];

  if (!showBackground) {
    return (
      <Ionicons
        name={name}
        size={platformSize}
        color={iconColor}
        style={iconStyles}
      />
    );
  }

  return (
    <View style={containerStyle}>
      <Ionicons
        name={name}
        size={isAndroid && isLightMode ? platformSize + 2 : platformSize}
        color={iconColor}
        style={iconStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 0,
      },
    }),
  },
});

export default ThemedIcon;
