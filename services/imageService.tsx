import { db, storage } from "@/firebase"
import { doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

export const uploadProfileImage = async (uri: string, uid: string) => {
  const response = await fetch(uri)
  const blob = await response.blob()

  const storageRef = ref(storage, `profileImages/${uid}`)
  const uploadTask = await uploadBytesResumable(storageRef, blob);


  // await uploadBytes(storageRef, blob)

  const downloadURL = await getDownloadURL(uploadTask.ref)
  return downloadURL
}

export const saveProfileImageUrl = async (uid: string, url: string) => {
  const userRef = doc(db, "users", uid)
  await updateDoc(userRef, { profileImage: url, updatedAt: serverTimestamp() })
}