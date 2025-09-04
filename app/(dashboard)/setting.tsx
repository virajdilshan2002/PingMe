import { auth } from "@/firebase"
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
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-center text-3xl mb-6">Settings</Text>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white text-lg font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SettingScreen
