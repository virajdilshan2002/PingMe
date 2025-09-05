import { register } from "@/services/authService"
import { useRouter } from "expo-router"
import { useState } from "react"
import { ActivityIndicator, Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

const Register = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [cPassword, setCPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const handleRegister = async () => {
    if (isLoading) return

    if (password !== cPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match")
      return
    }

    setIsLoading(true)
    await register(email, password)
      .then((res) => {
        // const res = await register(email, password)
        // success
        router.back()
      })
      .catch((err) => {
       if (err.code === "auth/email-already-in-use") {
         Alert.alert("Registration failed", "This email is already registered.")
       } else {
         Alert.alert("Registration failed", "Something went wrong.")
       }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <View className="flex-1 w-screen h-screen bg-white justify-center items-center px-6">
      <View className="flex-1 flex-col justify-center h-full w-full max-w-sm max-h-screen-safe bg-card rounded-3xl">
        <Image source={require("../../assets/images/logo/app_logo.png")} className="max-w-24 max-h-24 mb-2 self-center rounded-full" />
        <Text className="text-3xl font-bold text-center text-foreground mb-2">Create Account</Text>
        <Text className="text-base text-center text-muted-foreground mb-8">Sign up to get started</Text>

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
            <Text className="text-sm font-medium text-foreground mb-2">Password</Text>
            <View className="relative flex-row items-center">
              <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              className="bg-input w-full border-2 text-center border-orange-200 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-orange-300"
              />
              <TouchableOpacity className="absolute right-3" onPress={() => setShowPassword(!showPassword)}>
                <Ionicons className="bg-zinc-100 rounded-full p-1" name={showPassword ? "eye-off" : "eye"} size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-2">
            <Text className="text-sm font-medium text-foreground mb-2">Confirm Password</Text>
            <View className="relative flex-row items-center">
              <TextInput
                placeholder="Confirm your password"
                value={cPassword}
                onChangeText={setCPassword}
                secureTextEntry={!showConfirmPassword}
              className="bg-input w-full border-2 text-center border-orange-200 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-orange-300"
              />
              <TouchableOpacity
                className="absolute right-3"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons className="bg-zinc-100 rounded-full p-1" name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleRegister}
          disabled={isLoading}
          className={`mt-6 rounded-lg py-4 px-6 ${
            isLoading ? "bg-muted" : "bg-primary active:bg-primary/90"
          } shadow-sm`}
        >
          {isLoading ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator color="orange" size="small" />
              <Text className="text-primary-foreground font-semibold text-base ml-2">Creating account...</Text>
            </View>
          ) : (
            <Text className="text-primary-foreground font-semibold text-base text-center">Create Account</Text>
          )}
        </TouchableOpacity>

        <Pressable className="mt-6 py-2" onPress={() => router.back()}>
          <Text className="text-center text-muted-foreground">
            Already have an account? <Text className="text-accent font-medium">Sign in</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Register
