import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import {
  getThemeColors,
  getExpiryColors,
  type ThemeColors,
} from "../constants/colors";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeMode;
  activeTheme: "light" | "dark";
  setTheme: (theme: ThemeMode) => void;
  isDark: boolean;
  colors: ThemeColors;
  expiryColors: ReturnType<typeof getExpiryColors>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  activeTheme: "light",
  setTheme: () => {},
  isDark: false,
  colors: getThemeColors(false),
  expiryColors: getExpiryColors(false),
});

const THEME_STORAGE_KEY = "@expiry_buddy_theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme() || "light";
  const [theme, setThemeState] = useState<ThemeMode>("system");

  const activeTheme = theme === "system" ? systemColorScheme : theme;
  const isDark = activeTheme === "dark";

  // Get theme-aware colors
  const colors = getThemeColors(isDark);
  const expiryColors = getExpiryColors(isDark);

  // Load the saved theme from storage on initial load
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          setThemeState(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.error("Failed to load theme preference:", error);
      }
    };

    loadTheme();
  }, []);

  // Save the theme to storage whenever it changes
  const setTheme = async (newTheme: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error("Failed to save theme preference:", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, activeTheme, setTheme, isDark, colors, expiryColors }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
