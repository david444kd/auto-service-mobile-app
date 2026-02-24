import { View } from 'react-native';
import { Card, Text } from '@/shared/ui';
import type { Example } from '../model/types';

interface ExampleCardProps {
  example: Example;
}

const statusColors = {
  draft: 'bg-yellow-500/20 text-yellow-400',
  active: 'bg-green-500/20 text-green-400',
  archived: 'bg-gray-500/20 text-gray-400',
} as const;

export function ExampleCard({ example }: ExampleCardProps) {
  return (
    <Card variant="elevated">
      <View className="gap-2">
        <View className="flex-row items-center justify-between">
          <Text variant="h3" weight="semibold" className="flex-1">
            {example.title}
          </Text>
          <View className={`rounded-full px-2 py-1 ${statusColors[example.status]}`}>
            <Text variant="caption" weight="medium">
              {example.status}
            </Text>
          </View>
        </View>

        {example.description && (
          <Text variant="body" color="secondary">
            {example.description}
          </Text>
        )}

        <Text variant="caption" color="muted">
          Создано: {new Date(example.createdAt).toLocaleDateString('ru-RU')}
        </Text>
      </View>
    </Card>
  );
}
