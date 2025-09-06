import { ChevronRight, Menu, Search, Settings, User } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  

  const handleNavigation = (route: string) => {
    setShowDropdown(false)
  }

  return (
    <View className="bg-card bg-white pb-2 ">
      <View className="flex-row items-center justify-between mb-3">
       
        <Text className="text-3xl font-semibold text-orange-400 text-foreground">Ping Me</Text>

         <TouchableOpacity className="p-2" onPress={() => setShowDropdown(!showDropdown)}>
          <Menu size={24} color="#374151" />
        </TouchableOpacity>

        {showDropdown && (
            <View className="absolute z-50 top-12 right-0 bg-white border border-zinc-300 rounded-lg shadow-lg min-w-[160px]">
              <TouchableOpacity
                className="flex-row items-center px-4 py-3 border-b border-zinc-200"
                onPress={() => handleNavigation("profile")}
              >
                <User size={18} color="#374151" />
                <Text className="ml-3 text-foreground font-medium flex-1">Profile</Text>
                <ChevronRight size={16} color="#6b7280" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center px-4 py-3"
                onPress={() => handleNavigation("settings")}
              >
                <Settings size={18} color="#374151" />
                <Text className="ml-3 text-foreground font-medium flex-1">Settings</Text>
                <ChevronRight size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>
          )}

      </View>

      <View className="relative">
        <View className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <Search size={20} color="#6b7280" />
        </View>

        <TextInput
          className="bg-input border no-underline border-zinc-300 text-zinc-800 rounded-3xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground"
          placeholder="Search username"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#6b7280"
        />

        {searchQuery.length > 0 && (
          <TouchableOpacity className="absolute right-4 bg-zinc-200 px-2 rounded-full top-1/2 -translate-y-1/2" onPress={() => setSearchQuery("")}>
            <Text className="text-muted-foreground text-xl">×</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
