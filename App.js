import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const testImagePicker = async () => {
    try {
      // Request permissions
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const mediaPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        cameraPermission.status !== "granted" ||
        mediaPermission.status !== "granted"
      ) {
        Alert.alert("Permission denied");
        return;
      }

      // This line will cause the crash in production APK
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        Alert.alert("Success", `Image selected: ${result.assets[0].uri}`);
      }
    } catch (error) {
      console.error("ImagePicker error:", error);
      Alert.alert("Error", `ImagePicker failed: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>expo-image-picker Bug Repro</Text>
      <Text style={styles.subtitle}>
        Works in Expo Go, crashes in production APK
      </Text>

      <TouchableOpacity style={styles.button} onPress={testImagePicker}>
        <Text style={styles.buttonText}>Test Image Picker</Text>
      </TouchableOpacity>

      <Text style={styles.instructions}>
        1. Test in Expo Go - should work fine{"\n"}
        2. Build production APK - will crash with "Module 'ImageLoader' not
        found"
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  instructions: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    lineHeight: 20,
  },
});
