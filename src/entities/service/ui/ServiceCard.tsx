import { View } from 'react-native';
import { Button, Card, Text } from '@/shared/ui';
import type { Service } from '../model/types';

interface ServiceCardProps {
  service: Service;
  onPress: () => void;
}

export function ServiceCard({ service, onPress }: ServiceCardProps) {
  return (
    <Card variant="default">
      <View className="gap-3">
        <View className="flex-row items-center gap-3">
          <Text className="text-3xl">{service.emoji}</Text>
          <View className="flex-1">
            <Text variant="h3" weight="semibold">
              {service.name}
            </Text>
          </View>
        </View>

        <Text variant="body" color="secondary">
          {service.description}
        </Text>

        <View className="flex-row items-center gap-4">
          <Text variant="label" color="accent" weight="semibold">
            от {service.priceFrom.toLocaleString('ru-RU')} ₸
          </Text>
          <Text variant="label" color="muted">
            ~{service.durationMinutes} мин
          </Text>
        </View>

        <Button variant="primary" fullWidth onPress={onPress}>
          Записаться
        </Button>
      </View>
    </Card>
  );
}
