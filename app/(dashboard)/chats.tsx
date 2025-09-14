import ChatList from "@/components/ChatList";
import React from "react";
import { View } from "react-native";

const Chats = () => {

  return (
    <View className="flex-1 w-full bg-white">
      <ChatList />
    </View>
  );
};

export default Chats;
