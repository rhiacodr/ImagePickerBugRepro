# Minimal Reproducible Example: expo-image-picker Bug

This project demonstrates the issue where `expo-image-picker` works perfectly in **Expo Go** but fails in **production APK builds** with the error `Module 'ImageLoader' not found`.

## 🐛 Issue Summary

- ✅ **Works in Expo Go**: All image picker functionality works perfectly
- ❌ **Fails in Production APK**: App crashes with "Module 'ImageLoader' not found" when calling ImagePicker methods

## 🔧 Environment

- **Expo SDK**: 53.0.0
- **expo-image-picker**: Latest compatible version
- **Platform**: Android
- **Build Type**: APK (production)
- **React Native**: Latest for SDK 53

## 🚀 Quick Test

### Test in Development (Should Work)

```bash
# Start development server
npx expo start

# Open in Expo Go app and tap "Test Image Picker" button
# ✅ Should work perfectly - image picker opens without issues
```

### Test in Production (Will Fail)

```bash
# Clean prebuild (if needed)
npx expo prebuild --clean

# Build production APK
eas build --platform android --profile production

# Install APK on device and test
# ❌ Will crash with "Module 'ImageLoader' not found" when button is pressed
```

## 📱 How to Test

1. **Open the app**
2. **Tap "Test Image Picker" button**
3. **Grant permissions when prompted**
4. **Observe the behavior:**
   - In Expo Go: Image picker opens successfully
   - In Production APK: App crashes with module error

## 📋 Key Files

### App.js

The main component with a single button that triggers `ImagePicker.launchImageLibraryAsync()`. This is the minimal code needed to reproduce the issue.

### app.json

Contains the expo-image-picker plugin configuration with proper permissions for Android.

### eas.json

Configured to build APK files for easier testing and distribution.

## 🔍 Expected vs Actual

| Environment        | Expected       | Actual                                       |
| ------------------ | -------------- | -------------------------------------------- |
| **Expo Go**        | ✅ Works       | ✅ Works                                     |
| **Production APK** | ✅ Should work | ❌ Crashes: "Module 'ImageLoader' not found" |

## 🐞 Error Details

**Error Message:** `Module 'ImageLoader' not found`

**When it occurs:** Immediately when calling:

- `ImagePicker.launchImageLibraryAsync()`
- `ImagePicker.launchCameraAsync()`

**Root Cause:** Appears to be a native module linking issue specific to production builds where the ImageLoader module (part of expo-image-picker's native implementation) is not properly included in the final APK.

## 🔧 What's Been Tried

- ✅ Verified all required Android permissions are declared
- ✅ Confirmed expo-image-picker plugin is properly configured
- ✅ Ran clean prebuild process
- ✅ Tested with different build profiles
- ❌ Issue persists in all production APK builds

## 🎯 Impact

This issue is blocking app releases as image picker functionality is core to many mobile applications. The discrepancy between development and production environments makes it particularly problematic.

## 📝 Next Steps

This example can be used to:

1. Report the issue to the Expo team
2. Test potential fixes
3. Verify when the issue is resolved
4. Help others reproduce the same problem

---

**Note**: This is a minimal reproduction case. The issue also occurs in more complex applications but this stripped-down version makes it easier to isolate and debug the problem.
