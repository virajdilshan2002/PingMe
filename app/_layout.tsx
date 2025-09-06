import { AuthProvider } from "@/context/AuthContext";
import { LoaderProvider } from "@/context/LoaderContext";
import * as NavigationBar from "expo-navigation-bar";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./../global.css";

const RootLayout = () => {
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#ffffff"); // match your app bg
      NavigationBar.setButtonStyleAsync("dark");
    }
  }, []);

  return (
    <SafeAreaView edges={["top", "bottom", "left", "right"]} className="flex-1 bg-white">
      <StatusBar style="dark" />
      <LoaderProvider>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </LoaderProvider>
    </SafeAreaView>
  );
};

export default RootLayout;
