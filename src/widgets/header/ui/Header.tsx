import { View } from 'react-native';
import { Text } from '@/shared/ui';

interface HeaderProps {
  emoji?: string;
  title: string;
  subtitle?: string;
}

export function Header({ emoji, title, subtitle }: HeaderProps) {
  return (
    <View className="mb-10 mt-10 items-center">
      {emoji && <Text className="mb-4 text-6xl">{emoji}</Text>}
      <Text variant="h1" weight="bold" color="accent" center>
        {title}
      </Text>
      {subtitle && (
        <Text variant="body" color="secondary" center className="mt-2 px-5">
          {subtitle}
        </Text>
      )}
    </View>
  );
}
