import { DATA_KEY } from "@/constants"
import { subscribeChattedUsers } from "@/services/userProfileService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { FlatList, Text, View } from "react-native"
import ChatItem from "../components/ChatItem"

export default function ChatList() {
  const [users, setUsers] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<{ uid: string } | null>(null)

  useEffect(() => {
  const loadUser = async () => {
    const userData = await AsyncStorage.getItem(DATA_KEY)
    if (!userData) return
    const parsed = JSON.parse(userData)
    setCurrentUser(parsed)

    const unsub = subscribeChattedUsers(parsed.uid, (users) => {
      setUsers(users)
    })

    return unsub
  }

  const unsubPromise = loadUser()

  return () => {
    unsubPromise?.then(unsub => unsub && unsub())
  }
}, [])

  return (
    <View className="flex-1 bg-background px-2">
      {users.length === 0 ? (
        <Text className="text-center text-2xl mt-10">No Chats Yet.</Text>
      ) : (
        <FlatList
        data={users}
        keyExtractor={item => item.uid}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <ChatItem item={item} currentUser={currentUser}  />
        )}
      />
      )}      
    </View>
  )
}
