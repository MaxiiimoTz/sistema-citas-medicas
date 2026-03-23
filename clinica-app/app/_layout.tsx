import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,

        // 🔥 ANIMACIÓN GLOBAL
        animation: "slide_from_right",

        // duración
        animationDuration: 250,

        // estilo tipo iOS
        gestureEnabled: true,
        fullScreenGestureEnabled: true
      }}
    />
  );
}