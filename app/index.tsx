import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import "../global.css"

const index = () => {
  const router = useRouter()

  return (
    <View className='flex-1 w-full items-center justify-center'>
      <Text className='text-2xl font-bold'>index</Text>
      <Pressable onPress={() => router.push("/home")}>
        <Text className='text-blue-500'>Go to Dashboard</Text>
      </Pressable>
    </View>
  )
}

export default index