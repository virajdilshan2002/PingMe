import { Profile } from "@/types/profile"
import { getAuth } from "firebase/auth"
import { collection, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"

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

export const searchUser = async (keyword: string) => {
  // console.log("Searching for:", keyword)
  const q1 = query(collection(db, "users"), where("name", "==", keyword))
  const snap1 = await getDocs(q1)

  // console.log("Query result:", snap1.docs.map((doc) => ({ id: doc.id, ...doc.data() })))

  if (!snap1.empty) {
    return snap1.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  // // if not found, search by email
  // const q2 = query(collection(db, "users"), where("email", "==", keyword))
  // const snap2 = await getDocs(q2)

  // if (!snap2.empty) {
  //   return snap2.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  // }

  return []
}

export const getUsers = async (excludeUserId: string) => {
  const snapshot = await getDocs(collection(db, "users"))
  const users = snapshot.docs
    .map(doc => ({ uid: doc.id, ...doc.data() }))
    .filter(u => u.uid !== excludeUserId)
  return users
}