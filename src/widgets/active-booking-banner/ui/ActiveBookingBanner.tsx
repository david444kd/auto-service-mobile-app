import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from '@/shared/ui';

interface ActiveBookingBannerProps {
  serviceName: string;
  scheduledAt: string;
  onPress: () => void;
}

export function ActiveBookingBanner({ serviceName, scheduledAt, onPress }: ActiveBookingBannerProps) {
  const date = new Date(scheduledAt);
  const dateStr = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
  const timeStr = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card variant="elevated" style={styles.card}>
      <View className="gap-3">
        <View className="flex-row items-center gap-2">
          <View className="h-2 w-2 rounded-full bg-amber-500" />
          <Text variant="caption" color="muted" weight="medium">
            Ближайшая запись
          </Text>
        </View>

        <View>
          <Text variant="body" weight="semibold">
            {serviceName}
          </Text>
          <Text variant="label" color="secondary" className="mt-1">
            {dateStr} · {timeStr}
          </Text>
        </View>

        <Button variant="outline" size="sm" onPress={onPress}>
          Подробнее
        </Button>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
  },
});
