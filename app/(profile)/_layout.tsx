import { Stack } from "expo-router";
import React from "react";

const ProfileLayout = () => {
  return (
      <Stack
        screenOptions={{
          headerShown: false
        }}
    >
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
    </Stack>
    
  )
}

export default ProfileLayout
