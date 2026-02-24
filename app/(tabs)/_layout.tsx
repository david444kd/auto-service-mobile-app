import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <Text
      className={`text-[20px] px-2.5 py-1.5 rounded-xl ${focused ? 'bg-amber-500/20' : ''}`}
      style={{ overflow: 'hidden' }}
    >
      {emoji}
    </Text>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0e0f12',
          borderTopColor: '#1c1f28',
          height: 56 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        tabBarIconStyle: {
          width: 48,
          height: 48,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Запись',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📝" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Записи',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📋" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
