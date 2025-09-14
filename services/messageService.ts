import { db } from "@/firebase"
import { Message } from "@/types/message"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc
} from "firebase/firestore"

export const messageColRef = collection(db, "messages")

export const createMessage = async (message: Message) => {
  const docRef = await addDoc(messageColRef, message)
  return docRef.id
}

export const updateMessage = async (id: string, message: Message) => {
  const docRef = doc(db, "messages", id)
  const { id: _id, ...messageData } = message
  return await updateDoc(docRef, messageData)
}

export const deleteMessage = async (id: string) => {
  const docRef = doc(db, "messages", id)
  return await deleteDoc(docRef)
}

export const getAllMessageData = async () => {
  const snapshot = await getDocs(messageColRef)
  const messageList = snapshot.docs.map((messageRef) => ({
    id: messageRef.id,
    ...messageRef.data()
  })) as Message[]
  return messageList
}

export const getChatId = (uid1: string, uid2: string) => {
  return [uid1, uid2].sort().join("_");
};

export const getChatData = async (uid1: string, uid2: string) => {
  const chatId = getChatId(uid1, uid2)
  const chatRef = doc(db, "chats", chatId)
  const chatSnap = await getDoc(chatRef)

  if (chatSnap.exists()) {
    const data = chatSnap.data()
    return data
  }

  return null
}
