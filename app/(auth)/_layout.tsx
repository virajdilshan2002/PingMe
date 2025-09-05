import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from "react";
import { Platform, SafeAreaView } from "react-native";

const AuthLayout = () => {

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('blue');
      NavigationBar.setButtonStyleAsync('dark');
    }
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-white">
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
    </SafeAreaView>
  )
}

export default AuthLayout
