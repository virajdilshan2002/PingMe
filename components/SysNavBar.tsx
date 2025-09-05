import * as NavigationBar from "expo-navigation-bar"
import { useEffect } from "react"
import { Platform, useColorScheme } from "react-native"

export default function SystemNavigationBar() {
  const theme = useColorScheme()

  useEffect(() => {
    if (Platform.OS === "android") {
      // Disable edge-to-edge so we can apply background color
      NavigationBar.setPositionAsync("absolute")

      if (theme === "dark") {
        NavigationBar.setBackgroundColorAsync("#000000") // black
        NavigationBar.setButtonStyleAsync("light") // white icons
      } else {
        NavigationBar.setBackgroundColorAsync("#ffffff") // white
        NavigationBar.setButtonStyleAsync("dark") // dark icons
      }
    }
  }, [theme])

  return null
}
