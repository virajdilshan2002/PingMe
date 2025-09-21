import { DATA_KEY } from "@/constants";
import { db } from "@/firebase";
import { getChatId } from "@/services/messageService";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

const ChatScreen = () => {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const { id, name, profileImage } = useLocalSearchParams<{
    id: string;
    name: string;
    profileImage: string;
  }>();

  const contactInfo = { id, name, profileImage };

  const decodedImage = profileImage ? decodeURIComponent(profileImage as string) : null

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<{ uid: string; name: string; profileImage: string } | null>(null);
  const [sending, setSending] = useState(false);

  // Load logged-in user
  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem(DATA_KEY);
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
    };
    loadUser();
  }, []);

  const sendMessage = async () => {
  if (!message.trim() || !currentUser || sending) return;
  setSending(true);

  try {
    const chatId = getChatId(currentUser.uid, contactInfo.id);

    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);
    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        participants: [currentUser.uid, contactInfo.id],
        createdAt: serverTimestamp(),
        lastMessageTime: serverTimestamp(),
        lastMessage: message.trim()
      });
    } else {
      await setDoc(chatRef, { lastMessage: message.trim(), lastMessageTime: serverTimestamp() }, { merge: true });

    }

    await addDoc(collection(chatRef, "messages"), {
      text: message.trim(),
      sender: currentUser.uid,
      timestamp: serverTimestamp()
    });

    setMessage("");
  } catch (error) {
    console.log("Error sending message:", error);
  } finally {
    setSending(false);
  }
};

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };

  // Load messages in real time
  useLayoutEffect(() => {
    if (!currentUser || !contactInfo.id) return;

    const chatId = getChatId(currentUser.uid, contactInfo.id);

    const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, snapshot => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || new Date()
      })) as Message[];
      setMessages(msgs);

      // Scroll to bottom when new message arrives
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    });

    return unsubscribe;
  }, [currentUser, contactInfo.id]);

  // console.log("Contact info: ", contactInfo);

  return (
    <View className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 40 : 0}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 bg-background border-b border-border border-b-zinc-300">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <Ionicons name="arrow-back" size={24} color="#059669" />
          </TouchableOpacity>

          <View className="flex-row items-center flex-1 ml-3">
            <Image source={ contactInfo?.profileImage ? { uri: contactInfo.profileImage } : require("../../assets/images/logo/default_profile.png") } className="rounded-full w-10 h-10" />
            <View>
              <Text className="text-foreground font-semibold text-lg font-sans ml-2">{contactInfo.name}</Text>
              {/* <Text className="text-xs text-gray-400 ml-2">{contactInfo.id}</Text> */}
            </View>
            
          </View>

          <TouchableOpacity className="p-2">
            <Ionicons name="call" size={22} color="#059669" />
          </TouchableOpacity>
        </View>

        {/* Messages Area */}
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ flexGrow: 1, padding: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(msg => {
            const isMe = msg.sender === currentUser?.uid;
            return (
              <View key={msg.id} className={`mb-4 ${isMe ? "items-end" : "items-start"}`}>
                <View
                  className={`max-w-[80%] px-4 py-3 ${isMe ? "bg-orange-300 rounded-2xl rounded-br-md" : "bg-zinc-300 rounded-2xl rounded-bl-md"}`}
                >
                  <Text className={`text-base font-sans ${isMe ? "text-primary-foreground" : "text-secondary-foreground"}`}>
                    {msg.text}
                  </Text>
                </View>
                <Text className="text-xs text-muted-foreground mt-1 mx-2 font-sans">{formatTime(msg.timestamp)}</Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Message Input */}
        <View className="flex-row items-center px-4 py-3 bg-background border-t border-border border-zinc-300">
          <View className="flex-1 flex-row items-center bg-input rounded-full">
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message..."
              placeholderTextColor="#9ca3af"
              className="flex-1 text-base text-foreground font-sans"
              multiline
              maxLength={1000}
            />
            <TouchableOpacity className="ml-2">
              <Ionicons name="attach" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={sendMessage}
            className="w-12 h-12 bg-accent rounded-full items-center justify-center ml-2"
            disabled={!message.trim() || sending}
          >
            {sending ? (
              <Ionicons name="send" size={18} color="#6b7280" />
            ) : (
              <Ionicons name="send" size={18} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );

};

export default ChatScreen;
