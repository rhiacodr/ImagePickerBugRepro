import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import PhotoPicker from "../common/PhotoPicker";
import useThemedStyles, {
  createThemedStyles,
} from "../../hooks/use-themed-styles";
import Header from "../common/Header";

/**
 * EditItem component for editing existing items
 */
const EditItem = () => {
  const params = useLocalSearchParams();
  const itemId = params.id as string;

  const [photo, setPhoto] = useState<string | undefined>(undefined);

  // Use theme-aware styles
  const styles = useThemedStyles(createStyles);
  const [imageError, setImageError] = useState(false);

  /**
   * Handle photo change from PhotoPicker
   */
  const handlePhotoChange = useCallback(
    (photoUri: string) => {
      setPhoto(photoUri);
      // Reset image error when new photo is selected
      setImageError(false);
    },
    [setPhoto, setImageError]
  );

  /**
   * Handle image loading errors
   */
  const handleImageError = useCallback(() => {
    setImageError(true);
  }, [photo, "photo"]);

  /**
   * Reset image error when photo changes
   */
  useEffect(() => {
    if (!photo) {
      setImageError(false);
    }
  }, [photo]);

  return (
    <>
      <Header title="Edit Item" subtitle="Updated item details" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
        >
          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <PhotoPicker
                photo={photo}
                onPhotoChange={handlePhotoChange}
                onImageError={handleImageError}
                showPlaceholder={imageError}
                containerStyle={styles.photoContainer}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

/**
 * Create theme-aware styles for EditItem
 */
const createStyles = createThemedStyles((colors, isDark) => ({
  form: {
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 28,
  },
  // Photo styles
  photoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default EditItem;
