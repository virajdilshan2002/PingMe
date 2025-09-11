import { auth } from "@/firebase"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { signOut } from "firebase/auth"
import React from "react"
import { Alert, Text, TouchableOpacity, View } from "react-native"

const SettingScreen = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.replace("/login")
    } catch (error) {
      console.error("Logout error:", error)
      Alert.alert("Error", "Something went wrong while logging out")
    }
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between p-4 px-6 mt-3">
        <TouchableOpacity onPress={() => { router.back() }}>
          <Feather name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <View className="px-4 mt-8">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 rounded-lg py-3"
        >
          <Text className="text-center text-white font-medium">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SettingScreen
