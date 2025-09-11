import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const AuthLayout = () => {
  return (
    <View className="flex-1 bg-white">
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "ios_from_right"
        }}
    >
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
    </Stack>
    </View>
  )
}

export default AuthLayout
