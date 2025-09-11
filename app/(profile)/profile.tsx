import { useAuth } from "@/context/AuthContext"
import { saveProfileImageUrl, uploadProfileImage } from "@/services/imageService"
import { fetchProfile, updateProfile } from "@/services/userProfileService"
import type { Profile } from "@/types/profile"
import { Feather } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from "expo-media-library"
import { useRouter } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"

const ProfileScreen = () => {
  const { user, loading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<Profile | null>(null)
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions()
  const [photo, setPhoto] = useState<any>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!user) return;
    let isMounted = true;
    const loadProfile = async () => {
      try {
        const profile = await fetchProfile(user.uid);
        if (isMounted) setProfileData(profile);
      } catch (error) {
        console.log(error);
      }
    };
    loadProfile();
    return () => { isMounted = false; };
  }, [user]);

  const handleSave = useCallback(async () => {
    if (!user || !profileData) return;
    try {
      await updateProfile(user.uid, profileData);
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.log(error);
    }
  }, [user, profileData]);

  const handleImagePicker = useCallback(async () => {
    if (!mediaPermission || !mediaPermission.granted) {
      const perm = await requestMediaPermission();
      if (!perm?.granted) {
        Alert.alert("Permission", "Permission to access gallery is required!");
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (result.canceled) return;
    const imageUri = result.assets[0].uri;
    try {
      if (!user) {
        Alert.alert("Error", "User not found");
        return;
      }
      setIsUploadingImage(true);
      const url = await uploadProfileImage(imageUri, user.uid);
      await saveProfileImageUrl(user.uid, url);
      setProfileData((prev) => (prev ? { ...prev, profileImage: url } : prev));
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to upload image");
    } finally {
      setIsUploadingImage(false);
    }
  }, [mediaPermission, requestMediaPermission, user]);

  const updateField = useCallback((field: keyof Profile, value: string) => {
    setProfileData((prev) => (prev ? { ...prev, [field]: value } : prev));
  }, []);

  if (!profileData || loading) {
    return (
      <View className="flex-1 w-full justify-center align-items-center">
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {isUploadingImage && (
        <View className="absolute w-screen h-screen inset-0 bg-black/50 z-50 flex-1 justify-center items-center">
          <View className="bg-white rounded-xl p-6 items-center">
            <ActivityIndicator size="large" color="#059669" />
            <Text className="text-gray-900 font-medium mt-3">Uploading image...</Text>
          </View>
        </View>
      )}

      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 p-4 mt-3">
          <TouchableOpacity onPress={() => { router.back() }}>
            <Feather name="arrow-left" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">Profile</Text>
          <TouchableOpacity onPress={() => (isEditing ? handleSave() : setIsEditing(true))}>
            <Text className="text-emerald-600 font-medium">{isEditing ? "Save" : "Edit"}</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Image Section */}
        <View className="items-center py-6">
          <View className="relative">
            <Image source={{ uri: profileData.profileImage || undefined }} className="w-24 h-24 rounded-full" defaultSource={require("../../assets/images/logo/default_profile.png")} />
            {isEditing && (
              <TouchableOpacity
                onPress={handleImagePicker}
                disabled={isUploadingImage}
                className={`absolute -bottom-1 -right-1 rounded-full p-2 ${
                  isUploadingImage ? "bg-gray-400" : "bg-emerald-600"
                }`}
              >
                <Feather name="camera" size={16} color="white" />
              </TouchableOpacity>
            )}
          </View>
          <Text className="text-xl font-semibold text-gray-900 mt-3">{profileData.name}</Text>
          <Text className="text-gray-600">{profileData.email}</Text>
        </View>
      </View>

      {/* Profile Details */}
      <View className="bg-white mt-4 mx-4 rounded-xl shadow-sm">
        <View className="p-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Personal Information</Text>

          {/* Name Field */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Full Name</Text>
            {isEditing ? (
              <TextInput
                value={profileData.name}
                onChangeText={(text) => updateField("name", text)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-900"
                placeholder="Enter your full name"
              />
            ) : (
              <Text className="text-gray-900 py-3">{profileData.name}</Text>
            )}
          </View>
        </View>
      </View>

      {/* Cancel Button */}
      {isEditing && (
        <View className="mx-4 mt-4 mb-8">
          <TouchableOpacity onPress={() => setIsEditing(false)} className="bg-gray-200 rounded-lg py-3 mb-3">
            <Text className="text-center text-gray-700 font-medium">Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}

export default ProfileScreen
