import '../global.css';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { AppProviders } from '@/core';

export default function RootLayout() {
  return (
    <AppProviders>
      <View className="flex-1 items-center bg-[#0e0f12]">
        <View className="w-full max-w-[428px] flex-1 bg-[#0e0f12]">
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: '#0e0f12' },
              headerTintColor: '#f1f5f9',
              headerTitleStyle: { fontWeight: '600' },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </View>
      </View>
    </AppProviders>
  );
}
