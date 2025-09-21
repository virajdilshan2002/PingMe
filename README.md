# PingMe 📱

PingMe is a React Native chat app built with **Expo SDK 54**, **Expo Router**, and **Firebase (Auth, Firestore, Storage)**.  
Supports Android

---

## 🚀 Run the app

```sh
npm install
npm start
```
#### Update dependency

```sh
npx expo install --fix
npx expo-doctor
```
#### Force remove cache

```sh
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
```

#### Build
```sh
npm install -g eas-cli && eas login
eas build --platform android --profile production
```
