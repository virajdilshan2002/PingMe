import ChatList from "@/components/ChatList";
import { useAuth } from "@/context/AuthContext";
import { getUsers } from "@/services/userProfileService";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const Chats = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.uid) return;
      try {
        const res = await getUsers(user.uid); // pass current user uid if needed
        setUsers(res || []);
      } catch (err) {
        console.log("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user?.uid]);

  return (
    <View className="flex-1 w-full bg-white">
      {loading ? (
        <Text className="text-center text-lg mt-10">Loading...</Text>
      ) : users.length > 0 ? (
        <ChatList />
      ) : (
        <Text className="text-center text-2xl mt-10">No Chats Yet.</Text>
      )}
    </View>
  );
};

export default Chats;
