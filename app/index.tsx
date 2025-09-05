import { useAuth } from "@/context/AuthContext"
import { useRouter } from "expo-router"
import React, { useEffect } from "react"
import { ActivityIndicator, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const Index = () => {
  const router = useRouter()
  const { user, loading } = useAuth()
  console.log("User Data : ", user)

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/chats")
      } else {
        router.push("/login")
      }
    }
  }, [user, loading])

  return loading ? (
    <View className="flex-1 w-full justify-center align-items-center">
      <ActivityIndicator size="large" />
    </View>
  ) : null
}

export default Index
