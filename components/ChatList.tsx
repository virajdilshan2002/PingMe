import { getUsers } from "@/services/userProfileService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import ChatItem from "../components/ChatItem"
import { DATA_KEY } from "../constants"

export default function ChatList() {
  const [users, setUsers] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<{ uid: string } | null>(null)

  useEffect(() => {
    const loadUserAndUsers = async () => {
      const userData = await AsyncStorage.getItem(DATA_KEY)
      if (!userData) return
      const parsed = JSON.parse(userData)
      setCurrentUser(parsed)
      
      const fetchedUsers = await getUsers(parsed.uid)
      setUsers(fetchedUsers)
      
    }
    loadUserAndUsers()
  }, [])

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={users}
        keyExtractor={item => item.uid}
        contentContainerStyle={{ paddingVertical: 20 }}
        renderItem={({ item, index }) => (
          <ChatItem item={item} currentUser={currentUser} noBorder={index + 1 === users.length} />
        )}
      />
    </View>
  )
}
