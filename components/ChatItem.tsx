import { db } from "@/firebase"; // your Firestore instance
import { getChatId } from "@/services/messageService";
import { useRouter } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ChatItemProps {
  item: any
  currentUser: { uid: string } | null
  noBorder?: boolean
}

export default function ChatItem({ item, currentUser }: ChatItemProps) {
  const [chatData, setChatData] = useState<any>(null)
  const [date, setDate] = useState<string>("")
  const router = useRouter()
  if (!currentUser) return null

  useEffect(() => {
    if (!currentUser) return

    const chatId = getChatId(currentUser.uid, item.uid)

    const unsub = onSnapshot(doc(db, "chats", chatId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data()
        setChatData(data)

        if (data.lastMessageTime) {
          const timestamp = data.lastMessageTime
          const dateObj = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
          setDate(dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
        }
      }
    })

    return () => unsub() 
  }, [currentUser, item.uid])

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(chats)/[id]",
          params: {
            id: item.uid,
            name: item.name,
            profileImage: encodeURIComponent(item.profileImage),
          },
        })
      }
      className={`flex-row w-full rounded-2xl mb-1 bg-zinc-100 p-3 border-b border-gray-200`}
    >
      <Image
        source={item.profileImage ? { uri: item.profileImage } : require("../assets/images/logo/default_profile.png")}
        className="w-12 h-12 rounded-full"
      />
      <View className="flex-1 flex-row ml-3 justify-between items-center">
        <View className="flex-col justify-center">
          <Text className="text-lg font-semibold">{item.name}</Text>
          <Text className="text-sm text-gray-500">{chatData?.lastMessage ?? "No messages yet."}</Text>
        </View>
        <Text className="text-xs text-gray-400">{date}</Text>
      </View>
    </TouchableOpacity>
  )
}
