# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   expo install expo-router react-native-safe-area-context @react-native-async-storage/async-storage
   npm install axios
# types
   npm install -D typescript @types/react @types/react-native
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

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Feature

  **User List Screen in index.tsx**
    Displays a list of users fetched from [Random User API](https://randomuser.me/api/?results=20)
    Shows user's name, profile picture (thumbnail), and email
  **User Detail Screen in explore.tsx**
    Displays full user details: full name, large profile picture, email, phone number, and location (city, country)
  **Search Functionality**
    Search users by name or email (case-insensitive)
  **Bonus Features**
    Pull-to-refresh user list
    Infinite scrolling (load more users on scroll)
    Dark mode toggle
    Loading and error handling states

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
