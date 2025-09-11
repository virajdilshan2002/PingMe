import Header from "@/components/Header"
import { useAuth } from "@/context/AuthContext"
import { MaterialIcons } from "@expo/vector-icons"
import { Tabs, useRouter } from "expo-router"
import React, { useEffect } from "react"
import { ActivityIndicator, TouchableOpacity, View } from "react-native"


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
    <View className="flex-1">
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton(props) {
            const { delayLongPress, ...restProps } = props as any;
            return (
              <TouchableOpacity
                activeOpacity={1}
                {...(delayLongPress != null ? { delayLongPress } : {})}
                {...restProps}
              />
            )
          },
          tabBarActiveTintColor: "orange",
          tabBarInactiveTintColor: "#737373",
          tabBarStyle: {
            borderTopWidth: 0.5,
            backgroundColor: "#ffffff",
            marginTop: 0,
            height: 60,
            paddingTop: 4,
            shadowColor: "transparent",
          },
          tabBarItemStyle: {
            height: 30,
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
      </Tabs>
    </View>
  )
}

export default DashboardLayout
