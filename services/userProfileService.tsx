import { Profile } from "@/types/profile"
import { getAuth } from "firebase/auth"
import { doc, getDoc, getFirestore, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"

const auth = getAuth()
const db = getFirestore()

export const fetchProfile = async (id: string) => {
  if (!auth.currentUser) throw new Error("No authenticated user")

  const userRef = doc(db, "users", id)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    return { id: userSnap.id, ...(userSnap.data() as Profile) }
  } else {
    throw new Error("Profile not found")
  }
}

export const updateProfile = async (id: string, profile: Profile) => {
  if (!auth.currentUser) throw new Error("No authenticated user")

  const userRef = doc(db, "users", id)
  const { id: _id, ...profileData } = profile

  return await updateDoc(userRef, { ...profileData, updatedAt: serverTimestamp() })
}

export const createDefaultProfile = async (id: string, email: string) => {
  const userRef = doc(db, "users", id)
  await setDoc(userRef, {
    createdAt: serverTimestamp(),
    email,
    name: "User",
    profileImage: "default_profile.png",
    updatedAt: serverTimestamp()
  })
}
