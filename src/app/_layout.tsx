import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "@/constants/colors";

/**
 * Root layout for the file-based routes. Expo Router already wraps the tree in a
 * SafeAreaProvider, so this only sets up the stack itself.
 *
 * Route files re-export screens from src/screens as defaults because that is
 * how Expo Router picks them up; the rest of the codebase uses named exports.
 */
export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          // The screens draw their own titles, and none of them sit in a
          // hierarchy, so a header and a slide transition would both be noise.
          headerShown: false,
          animation: "fade",
          // Without this the stack shows its own white background mid-transition.
          contentStyle: { backgroundColor: COLORS.background }
        }}
      />
    </>
  );
}
