import { auth } from "@/firebase"
import { login } from "@/services/authService"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { ActivityIndicator, Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native"

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
  if (isLoading) return

  if (!email || !password) {
    Alert.alert("Login Credentials", "Please enter email and password!", [{ text: "OK" }])
    return
  }

  setIsLoading(true)

  try {
     const res = await login(email, password)

    if (!res.user.emailVerified) {
      Alert.alert("Email Not Verified", "Please verify your email before logging in.")
      await auth.signOut()
      return
    }
    
    router.push("/chats")
  } catch (err: any) {
    console.error("Login error:", err)

    let message = "Something went wrong. Please try again."
    if (err.code === "auth/invalid-email") {
      message = "Invalid email format."
    } else if (err.code === "auth/user-not-found" || "auth/invalid-credential") {
      message = "No account found with this email."
    } else if (err.code === "auth/wrong-password") {
      message = "Incorrect password."
    } else if (err.code === "auth/too-many-requests") {
      message = "Too many attempts. Try again later."
    }

    // ✅ Show alert properly
    Alert.alert("Login Failed", message, [{ text: "OK" }])
  } finally {
    setIsLoading(false)
  }
}


  return (
    <View className="flex-1 w-screen h-screen bg-white justify-center items-center px-6">
      <View className="flex-1 flex-col justify-center h-full w-full max-w-sm max-h-screen-safe bg-card rounded-3xl">
        <Image source={require("../../assets/images/logo/app_logo.png")} className="max-w-24 max-h-24 mb-2 self-center rounded-full" />
        <Text className="text-3xl font-bold text-center text-foreground mb-4">Ping Me</Text>
        <Text className="text-3xl text-center text-foreground mb-2">Welcome Back</Text>
        <Text className="text-base text-center text-muted-foreground mb-8">Sign in to your account</Text>

        <View className="space-y-4">
          <View>
            {/* <Text className="text-sm font-medium text-foreground mb-2">Email</Text> */}
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-input border-2 text-center border-orange-200 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-orange-300"
            />
          </View>

          <View className="mt-4">
            {/* <Text className="text-sm font-medium text-foreground mb-2">Password</Text> */}
            <View className="relative flex-row items-center">
              <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              className="bg-input border-2 w-full text-center border-orange-200 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-orange-300"
              />
              <TouchableOpacity className="absolute right-3" onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  className="bg-zinc-100 rounded-full p-1"
                  name={showPassword ? "eye-off" : "eye"}
                  size={22}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading}
          className={`mt-6 rounded-lg py-4 px-6 ${
            isLoading ? "bg-muted" : "bg-primary active:bg-primary/90"
          } shadow-sm`}
        >
          {isLoading ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator color="orange" size="small" />
              <Text className="text-primary-foreground font-semibold text-base ml-2">Signing in...</Text>
            </View>
          ) : (
            <Text className="text-primary-foreground font-semibold text-base text-center">Sign In</Text>
          )}
        </TouchableOpacity>

        <Pressable className="mt-6 py-2" onPress={() => router.push("../register")}>
          <Text className="text-center text-muted-foreground">
            Don't have an account? <Text className="text-accent font-medium">Sign up</Text>
          </Text>
        </Pressable>

        <Pressable className="mt-2 py-2">
          <Text className="text-center text-accent text-sm font-medium">Forgot your password?</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Login
