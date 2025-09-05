import { auth } from "@/firebase"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"
import { Alert } from "react-native"
import { createDefaultProfile } from "./userProfileService"

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
  return signOut(auth)
}

export const register = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    await createDefaultProfile(user.uid, email)

    await sendEmailVerification(user).then(() => {
      Alert.alert(
        "Verify Your Email",
        "We've sent a verification link to your email. Please verify before logging in."
      )
    })

    return userCredential
}
