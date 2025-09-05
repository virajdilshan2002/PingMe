import { db, storage } from "@/firebase"
import { doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const uploadProfileImage = async (uri: string, uid: string) => {
  const response = await fetch(uri)
  const blob = await response.blob()

  const storageRef = ref(storage, `profileImages/${uid}`)

  await uploadBytes(storageRef, blob)

  const downloadURL = await getDownloadURL(storageRef)
  return downloadURL
}

export const saveProfileImageUrl = async (uid: string, url: string) => {
  const userRef = doc(db, "users", uid)
  await updateDoc(userRef, { profileImage: url, updatedAt: serverTimestamp() })
}