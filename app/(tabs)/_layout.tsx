// App/(tabs)/layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { useTheme } from "../_layout";

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: theme === "dark" ? "#111" : "#fff" },
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Users" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
    </Tabs>
  );
}
