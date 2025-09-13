import { useRouter } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"

interface ChatItemProps {
  item: any
  currentUser: { uid: string } | null
  noBorder?: boolean
}

export default function ChatItem({ item, currentUser, noBorder }: ChatItemProps) {
  const router = useRouter()
  if (!currentUser) return null

  // console.log("Rendering ChatItem for user:", item);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(chats)/[id]",
          params: {
            id: item.uid,
            name: item.name,
            profileImage: item.profileImage,
          },
        })
      }
      className={`flex-row w-full bg-zinc-100 px-3 py-2 ${noBorder ? "" : "border-b border-gray-200"}`}
    >
      <Image
        source={item.profileImage ? { uri: item.profileImage } : require("../assets/images/logo/default_profile.png")}
        className="w-12 h-12 rounded-full"
      />
      <View className="flex-1 ml-3 justify-center">
        <Text className="text-lg font-semibold">{item.name}</Text>
      </View>
    </TouchableOpacity>
  )
}
