import { searchUser } from "@/services/userProfileService";
import { useRouter } from "expo-router";
import { ChevronRight, Menu, Search, Settings, User } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Header() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchedUser, setSearchedUser] = useState<{ id: string; name: string; profileImage: string }[]>([])
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const router = useRouter();

  const handleSearchUser = async (keyword: string) => {
    const data = await searchUser(keyword)

    if (data && data.length > 0) {
      setSearchedUser(
      data.map((user: any) => ({
        id: user.id,
        name: user.name,
        profileImage: user.profileImage,
      }))
      );
      setShowSearchPopup(true);
    } else {
      setSearchedUser([]);
      setShowSearchPopup(false);
    }
  }

  return (
    <View className="bg-card bg-white p-2 pb-3">
      <View className="flex-row items-center justify-between mb-2">
       
        <Text className="text-3xl font-semibold text-orange-400 text-foreground">Ping Me</Text>

         <TouchableOpacity className="p-2" onPress={() => setShowDropdown(!showDropdown)}>
          <Menu size={24} color="#374151" />
        </TouchableOpacity>

        {showDropdown && (
            <View className="absolute z-50 top-12 right-0 bg-white border border-zinc-300 rounded-lg shadow-lg min-w-[160px]">
              <TouchableOpacity
                className="flex-row items-center px-4 py-3 border-b border-zinc-200"
                onPress={() => {
                  setShowDropdown(false);
                  router.push("/(profile)/profile");
                }}
              >
                <User size={18} color="#374151" />
                <Text className="ml-3 text-foreground font-medium flex-1">Profile</Text>
                <ChevronRight size={16} color="#6b7280" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center px-4 py-3"
                onPress={() => {
                  setShowDropdown(false);
                  router.push("/(profile)/settings");
                }}
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
          value={searchKeyword}
          onChangeText={(text) => {
            setSearchKeyword(text);
            handleSearchUser(text);
          }}
  placeholderTextColor="#6b7280"
/>


        {/* {searchKeyword.length > 0 && (
          <TouchableOpacity className="absolute right-4 bg-zinc-200 px-2 rounded-full top-1/2 -translate-y-1/2" onPress={() => setSearchKeyword("")}>
            <Text className="text-muted-foreground text-xl">×</Text>
          </TouchableOpacity>
        )} */}

        {searchKeyword.length > 0 && (
          <TouchableOpacity
            className="absolute right-4 bg-zinc-200 px-2 rounded-full top-1/2 -translate-y-1/2"
            onPress={() => {
              setSearchKeyword("");
              setShowSearchPopup(false);
            }}
          >
            <Text className="text-muted-foreground text-xl">×</Text>
          </TouchableOpacity>
        )}

        {showSearchPopup && (
          <View className="absolute top-14 left-0 right-0 z-50 bg-white border border-zinc-300 rounded-lg shadow-lg max-h-60">
            <FlatList
              data={searchedUser}
              keyExtractor={(user) => user.id}
              renderItem={({ item: user }) => (
                <TouchableOpacity
                  className="flex-row items-center px-4 py-3 border-b border-zinc-200"
                  onPress={() => {
                    setShowSearchPopup(false);
                    setSearchKeyword(user.name);
                    router.push({
                      pathname: "/(chats)/[id]",
                      params: {
                      id: user.id,
                      name: user.name,
                      avatar: user.profileImage,
                      },
                    });
                  }}
                >
                  <Image source={{ uri: user.profileImage }} className="w-9 h-9 rounded-full mr-2" />
                  <Text className="text-foreground">{user.name}</Text>
                </TouchableOpacity>
                
              )}
            />
            
          </View>
        )}
      </View>
    </View>
  )
}
