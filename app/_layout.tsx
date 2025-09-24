// App/layout.tsx
import React, { createContext, useEffect, useState, useContext } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ColorSchemeName, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: ColorSchemeName;
  mode: ThemeMode;
  setMode: (m: ThemeMode) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export default function RootLayout() {
  const system = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>("system");

  useEffect(() => {
    (async () => {
      const v = await AsyncStorage.getItem("themeMode");
      if (v === "light" || v === "dark" || v === "system") setModeState(v);
    })();
  }, []);

  const setMode = async (m: ThemeMode) => {
    setModeState(m);
    await AsyncStorage.setItem("themeMode", m);
  };

  const resolved = mode === "system" ? system : (mode as ColorSchemeName);

  return (
    <SafeAreaProvider>
      <ThemeContext.Provider value={{ theme: resolved, mode, setMode }}>
        {/* expo-router Stack: global navigation container */}
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: resolved === "dark" ? "#000" : "#fff",
            },
          }}
        />
        <StatusBar style={resolved === "dark" ? "light" : "dark"} />
      </ThemeContext.Provider>
    </SafeAreaProvider>
  );
}
