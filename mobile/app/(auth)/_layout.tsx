import { Stack } from "expo-router";

export default function AuthLayout() {
  // TODO: Check auth, redirect to login if not authenticated
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="glory-map" />
      <Stack.Screen name="sphere/[id]" />
      <Stack.Screen name="project/[id]" />
      <Stack.Screen name="rhythm/[id]" />
      <Stack.Screen name="task/[id]" />
      <Stack.Screen name="projects" />
      <Stack.Screen name="attune" />
      <Stack.Screen name="archive" />
    </Stack>
  );
}
