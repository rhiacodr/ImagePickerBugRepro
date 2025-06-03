import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/theme";
import HeaderButton from "./HeaderButton";

type Props = {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  rightButton?: {
    iconName: string;
    color?: string;
    onPress: () => void;
    accessibilityLabel?: string;
  };
  showBorder?: boolean;
  variant?: "default" | "prominent" | "compact";
};

/**
 * Enhanced reusable header component with improved UI/UX and theme awareness
 */
const Header = ({
  title,
  subtitle,
  showBackButton,
  rightButton,
  showBorder = true,
  variant = "default",
}: Props) => {
  const { colors, isDark } = useTheme();
  const router = useRouter();

  // Handle back navigation
  const handleBackPress = () => router.back();

  // Determine background color based on theme and variant
  const getBackgroundColor = () => {
    if (variant === "prominent") {
      return isDark
        ? `${colors.BACKGROUND.SECONDARY}`
        : `${colors.INTERACTIVE.PRIMARY}10`;
    }
    return "transparent";
  };

  // Determine border style based on theme and showBorder prop
  const getBorderStyle = () => {
    if (!showBorder) return {};

    return {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: isDark
        ? `${colors.BORDER.PRIMARY}80`
        : colors.BORDER.SUBTLE,
    };
  };

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: getBackgroundColor() },
        getBorderStyle(),
      ]}
    >
      <View style={styles.headerContent}>
        <View style={styles.headerLeftContainer}>
          {/* Left button (Back button) */}
          {showBackButton && (
            <HeaderButton
              iconName="arrow-back"
              color={colors.TEXT.TERTIARY}
              onPress={handleBackPress}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            />
          )}

          {/* Title */}
          <View style={[styles.headerText]}>
            {title && (
              <Text style={[styles.title, { color: colors.TEXT.PRIMARY }]}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text style={[styles.subtitle, { color: colors.TEXT.SECONDARY }]}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        {/* Right button */}
        <View style={styles.headerRightContainer}>
          {rightButton && (
            <HeaderButton
              iconName={rightButton.iconName}
              color={rightButton.color || colors.INTERACTIVE.PRIMARY}
              accessibilityLabel={rightButton.accessibilityLabel || "Action"}
              accessibilityRole="button"
              onPress={rightButton.onPress}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    paddingTop: Platform.OS === "ios" ? 16 : 20,
    paddingBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
    }),
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  headerRightContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    gap: 2,
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.3,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    opacity: 0.85,
  },
});

export default Header;
