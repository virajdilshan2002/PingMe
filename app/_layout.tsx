import { AuthProvider } from "@/context/AuthContext";
import { LoaderProvider } from "@/context/LoaderContext";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./../global.css";

const RootLayout = () => {
  const theme = useColorScheme();

  return (
    <SafeAreaView edges={["top", "bottom", "left", "right"]} className={`flex-1 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <LoaderProvider>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </LoaderProvider>
    </SafeAreaView>
  );
};

export default RootLayout;
