import Header from "@/components/Header"
import { MaterialIcons } from "@expo/vector-icons"
import * as NavigationBar from 'expo-navigation-bar'
import { Tabs, useRouter } from "expo-router"
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from "react"
import { Platform, SafeAreaView } from "react-native"


const DashboardLayout = () => {
  const router = useRouter()

   useEffect(() => {
        if (Platform.OS === 'android') {
          NavigationBar.setBackgroundColorAsync('blue');
          NavigationBar.setButtonStyleAsync('dark');
        }
      }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
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
    </SafeAreaView>
  )
}

export default DashboardLayout
