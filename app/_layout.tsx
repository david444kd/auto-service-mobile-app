import "../global.css";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { AppProviders } from "@/core";
import { useAuthLoading, useCurrentUser } from "@/shared/stores";

function RootNavigator() {
  const user = useCurrentUser();
  const isLoading = useAuthLoading();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0e0f12" }}>
        <ActivityIndicator size="large" color="#f59e0b" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0e0f12" },
        headerTintColor: "#f1f5f9",
        headerTitleStyle: { fontWeight: "600" },
      }}
    >
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <View className="flex-1 items-center bg-[#0e0f12]">
        <View className="w-full max-w-[428px] flex-1 bg-[#0e0f12]">
          <RootNavigator />
        </View>
      </View>
    </AppProviders>
  );
}
