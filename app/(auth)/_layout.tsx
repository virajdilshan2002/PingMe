import { Stack } from "expo-router"
import React from "react"

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right"
      }}
    >
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Login" }} />
    </Stack>
  )
}

export default AuthLayout
