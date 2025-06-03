import React from "react";
import { View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../contexts/theme";
import useThemedStyles, { createThemedStyles } from "@/hooks/use-themed-styles";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  preset?: "default" | "camera" | "transparent";
  enableSafeArea?: boolean;
  edges?: ("top" | "right" | "bottom" | "left")[];
};

const ScreenWrapper = ({
  children,
  style,
  preset = "default",
  enableSafeArea = true,
  edges = ["top", "right", "left"], // Exclude bottom edge for tab navigation
}: Props) => {
  const { isDark } = useTheme();

  // Use theme-aware styles
  const styles = useThemedStyles(createStyles);

  const getBackgroundColor = () => {
    switch (preset) {
      case "camera":
        return "#000000";
      case "transparent":
        return "transparent";
      default:
        return isDark ? "#000000" : "#ffffff";
    }
  };

  const getStatusBarStyle = () => {
    switch (preset) {
      case "camera":
        return "light";
      case "transparent":
        return isDark ? "light" : "dark";
      default:
        return isDark ? "light" : "dark";
    }
  };

  const content = (
    <>
      <StatusBar
        style={getStatusBarStyle()}
        backgroundColor={getBackgroundColor()}
      />
      {children}
    </>
  );

  if (!enableSafeArea) {
    return content;
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
      edges={edges}
    >
      <View style={[styles.content, style]}>{content}</View>
    </SafeAreaView>
  );
};

const createStyles = createThemedStyles((colors, isDark) => ({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND.PRIMARY,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
}));

export default ScreenWrapper;
