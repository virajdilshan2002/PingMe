import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { View } from "react-native";

const AuthLayout = () => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right"
        }}
    >
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
    </Stack>
    </View>
  )
}

export default AuthLayout
