import Header from "@/components/Header"
import { useAuth } from "@/context/AuthContext"
import { MaterialIcons } from "@expo/vector-icons"
import { Tabs, useRouter } from "expo-router"
import React, { useEffect } from "react"
import { ActivityIndicator, View } from "react-native"

const DashboardLayout = () => {
  const router = useRouter()
  const { user, loading } = useAuth()

   useEffect(() => {
        if (!loading && !user) {
          router.push("/login")
        }
    }, [user, loading]);

  if (loading) {
    return (
      <View className="flex-1 w-full justify-center align-items-center">
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white">
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "orange",
          tabBarInactiveTintColor: "#737373",
          tabBarStyle: {
            backgroundColor: "#ffffff",
            marginBottom: 0,
            height: 100,
          },
          tabBarLabelStyle: {
            fontSize: 10
          },
          tabBarIconStyle: {
            marginTop: 3
          }
        }}
      >
        <Tabs.Screen
          name="chats"
          options={{
            title: "Chats",
            tabBarIcon: (data) => (
              <MaterialIcons
                name="chat"
                size={data.size}
                color={data.color}
              />
            )
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: (data) => (
              <MaterialIcons
                name="person"
                size={data.size}
                color={data.color}
              />
            )
          }}
        />
        <Tabs.Screen
          name="setting"
          options={{
            title: "Setting",
            tabBarIcon: (data) => (
              <MaterialIcons
                name="settings"
                size={data.size}
                color={data.color}
              />
            )
          }}
        />
      </Tabs>
    </View>
  )
}

export default DashboardLayout
