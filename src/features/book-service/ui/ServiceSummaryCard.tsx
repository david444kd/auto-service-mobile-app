import { View } from 'react-native';
import { Button, Card, Text } from '@/shared/ui';
import type { Service } from '@/entities/service';

interface ServiceSummaryCardProps {
  service: Service;
  onChangePress: () => void;
}

export function ServiceSummaryCard({ service, onChangePress }: ServiceSummaryCardProps) {
  return (
    <Card variant="default">
      <View className="gap-2">
        <View className="flex-row items-center justify-between">
          <Text variant="label" color="muted" weight="medium">
            Выбранная услуга
          </Text>
          <Button variant="ghost" size="sm" onPress={onChangePress}>
            Изменить
          </Button>
        </View>

        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#0e0f12]">
            <Text className="text-xl">{service.emoji}</Text>
          </View>
          <View className="flex-1">
            <Text variant="body" weight="semibold">
              {service.name}
            </Text>
            <View className="mt-1 flex-row items-center gap-3">
              <Text variant="caption" color="accent">
                от {service.priceFrom.toLocaleString('ru-RU')} ₸
              </Text>
              <Text variant="caption" color="muted">
                ~{service.durationMinutes} мин
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
}
