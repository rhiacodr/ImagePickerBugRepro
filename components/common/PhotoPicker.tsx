import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../../contexts/theme";
import {
  createThemedStyles,
  useThemedStyles,
} from "../../hooks/use-themed-styles";

type Props = {
  photo?: string;
  onPhotoChange: (photoUri: string) => void;
  onImageError?: () => void;
  showPlaceholder?: boolean;
  containerStyle?: any;
};

/**
 * A reusable component for photo picking and display
 */
const PhotoPicker = ({
  photo,
  onPhotoChange,
  onImageError,
  showPlaceholder = false,
  containerStyle,
}: Props) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Request camera permissions and handle photo selection
   */
  const handlePhotoSelection = useCallback(() => {
    Alert.alert("Select Photo", "Choose how you would like to add a photo", [
      { text: "Camera", onPress: () => openCamera() },
      { text: "Photo Library", onPress: () => openImagePicker() },
      { text: "Cancel", style: "cancel" },
    ]);
  }, []);

  /**
   * Open camera for photo capture
   */
  const openCamera = useCallback(async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Camera permission is required to take photos."
        );
        return;
      }

      setIsLoading(true);
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onPhotoChange(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open camera. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [onPhotoChange]);

  /**
   * Open image picker for photo selection
   */
  const openImagePicker = useCallback(async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Photo library permission is required to select photos."
        );
        return;
      }

      setIsLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onPhotoChange(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open photo library. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [onPhotoChange]);

  /**
   * Handle image loading errors
   */
  const handleImageLoadError = useCallback(() => {
    onImageError?.();
  }, [photo, onImageError]);

  const hasPhoto = photo && !showPlaceholder;

  return (
    <View style={[styles.container, containerStyle]}>
      {hasPhoto ? (
        <View style={styles.photoPreviewContainer}>
          <Image
            source={{ uri: photo }}
            style={styles.photoPreview}
            onError={handleImageLoadError}
            resizeMode="cover"
          />
          <View style={styles.photoActions}>
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={handlePhotoSelection}
              accessibilityLabel="Change photo"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="camera" size={16} color={colors.TEXT.INVERSE} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.photoPlaceholder}
          onPress={handlePhotoSelection}
          disabled={isLoading}
          activeOpacity={0.7}
          accessibilityLabel={
            showPlaceholder ? "Retry adding photo" : "Add photo"
          }
          accessibilityRole="button"
        >
          <View style={styles.photoIconContainer}>
            <Ionicons
              name={showPlaceholder ? "alert-circle" : "camera"}
              size={30}
              color={
                showPlaceholder
                  ? colors.STATUS.ALERT
                  : colors.INTERACTIVE.PRIMARY
              }
            />
          </View>
          <Text style={styles.photoPlaceholderText}>
            {isLoading
              ? "Loading..."
              : showPlaceholder
              ? "Failed to Load Image"
              : "Add Photo"}
          </Text>
          <Text style={styles.photoPlaceholderSubtext}>
            {showPlaceholder
              ? "Tap to try adding a new photo"
              : "Take a photo or choose from library"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const createStyles = createThemedStyles((colors, isDark) => ({
  container: {
    width: "100%",
  },
  photoPreviewContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  photoPreview: {
    width: "100%",
    height: "100%",
  },
  photoActions: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    gap: 8,
  },
  changePhotoButton: {
    backgroundColor: colors.INTERACTIVE.PRIMARY,
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  photoPlaceholder: {
    width: "100%",
    height: 120,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.INTERACTIVE.PRIMARY,
    backgroundColor: `${colors.INTERACTIVE.PRIMARY}08`,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  photoIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `${colors.INTERACTIVE.PRIMARY}20`,
    alignItems: "center",
    justifyContent: "center",
  },
  photoPlaceholderText: {
    fontSize: 16,
    color: colors.TEXT.PRIMARY,
    fontWeight: "600",
    textAlign: "center",
  },
  photoPlaceholderSubtext: {
    fontSize: 12,
    color: colors.TEXT.SECONDARY,
    fontWeight: "400",
    textAlign: "center",
    paddingHorizontal: 20,
  },
}));

export default PhotoPicker;
