import { auth } from "@/firebase"
import { Profile } from "@/types/profile"
// import { getAuth } from "firebase/auth"
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"

// const auth = getAuth()
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
    profileImage: "",
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

export const subscribeChattedUsers = (
  currentUserId: string,
  callback: (users: any[]) => void
    ) => {
  const q = query(
    collection(db, "chats"),
    where("participants", "array-contains", currentUserId)
  )

  const unsub = onSnapshot(q, async (snapshot) => {
    const userIds = new Set<string>()
    snapshot.forEach(doc => {
      const data = doc.data()
      data.participants.forEach((uid: string) => {
        if (uid !== currentUserId) userIds.add(uid)
      })
    })

    if (userIds.size === 0) {
      callback([])
      return
    }

    const usersCol = collection(db, "users")
    const usersSnap = await getDocs(usersCol)
    const users = usersSnap.docs
      .map(doc => ({ uid: doc.id, ...doc.data() }))
      .filter(u => userIds.has(u.uid))

    callback(users)
  })

  return unsub
}

      