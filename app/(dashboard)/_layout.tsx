import { MaterialIcons } from "@expo/vector-icons"
import { Tabs, useRouter } from "expo-router"
import React from "react"
import { SafeAreaView } from "react-native"

const DashboardLayout = () => {
  const router = useRouter()

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#2ecc71",
          tabBarInactiveTintColor: "#2c3e50",
          tabBarStyle: {
            backgroundColor: "#bdc3c7"
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: (data) => (
              <MaterialIcons
                name="home-filled"
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

    </SafeAreaView>
  )
}

export default DashboardLayout
