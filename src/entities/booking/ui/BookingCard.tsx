import { View } from 'react-native';
import { Button, Card, Text } from '@/shared/ui';
import type { Booking } from '../model/types';
import { StatusBadge } from './StatusBadge';

interface BookingCardProps {
  booking: Booking;
  variant?: 'upcoming' | 'past';
  onCancel?: (id: string) => void;
}

function canCancel(booking: Booking): boolean {
  if (booking.status !== 'pending' && booking.status !== 'confirmed') return false;
  return new Date(booking.scheduledAt) > new Date();
}

export function BookingCard({ booking, variant = 'past', onCancel }: BookingCardProps) {
  const isUpcoming = variant === 'upcoming';
  const showCancel = isUpcoming && canCancel(booking) && onCancel;

  const scheduledDate = new Date(booking.scheduledAt);
  const dateStr = scheduledDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeStr = scheduledDate.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card variant={isUpcoming ? 'elevated' : 'default'}>
      <View className="gap-3">
        <View className="flex-row items-center justify-between">
          <StatusBadge status={booking.status} />
          <Text variant="caption" color="muted">
            {dateStr} {timeStr}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Text className="text-xl">{booking.service.emoji}</Text>
          <Text variant="body" weight="semibold">
            {booking.service.name}
          </Text>
        </View>

        <Text variant="label" color="secondary">
          {booking.car.make} · {booking.car.year} · {booking.car.plateNumber}
        </Text>

        {showCancel && (
          <Button variant="outline" size="sm" onPress={() => onCancel(booking.id)}>
            Отменить
          </Button>
        )}
      </View>
    </Card>
  );
}
