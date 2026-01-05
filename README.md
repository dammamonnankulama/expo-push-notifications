# Welcome to simple Expo app 👋

## 🚀 Features

- **Push Notification Registration** - Seamless Expo push token generation
- **Device Management** - Register, unregister, and track user devices
- **Cross-Platform Support** - Works on both iOS and Android
- **Secure Token Storage** - Uses Expo SecureStore for sensitive data
- **Type-Safe** - Full TypeScript implementation

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/expo-push-notifications.git
   cd expo-push-notifications
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure EAS project:
   ```bash
   npx eas login
   npx eas project:init
   ```

4. Update `app.json` with your EAS project ID:
   ```json
   {
     "expo": {
       "extra": {
         "eas": {
           "projectId": "your-project-id"
         }
       }
     }
   }
   ```

5. Start the development server:
   ```bash
   npx expo start
   ```

## 🛠️ Tech Stack

- [Expo](https://expo.dev/) - React Native framework
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [Expo Notifications](https://docs.expo.dev/push-notifications/overview/) - Push notification handling
- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/) - Secure storage
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Axios](https://axios-http.com/) - HTTP client

## 📋 Prerequisites

- Node.js (v18 or higher)
- Expo CLI
- EAS CLI (for push notifications)
- Physical device (push notifications don't work on simulators)

 ## 🧪 Testing Push Notifications

Use [Expo's Push Notification Tool](https://expo.dev/notifications) to test notifications with your device's push token.

## 📄 License

This project is licensed under the MIT License.

