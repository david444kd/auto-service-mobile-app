import { View } from 'react-native';
import { Text } from '@/shared/ui';
import type { BookingStatus } from '../model/types';

interface StatusBadgeProps {
  status: BookingStatus;
}

const statusConfig: Record<BookingStatus, { label: string; className: string; textClass: string }> = {
  pending: {
    label: 'Ожидает',
    className: 'bg-amber-500/15',
    textClass: 'text-amber-400',
  },
  confirmed: {
    label: 'Подтверждено',
    className: 'bg-sky-500/15',
    textClass: 'text-sky-400',
  },
  in_progress: {
    label: 'В работе',
    className: 'bg-orange-500/15',
    textClass: 'text-orange-400',
  },
  completed: {
    label: 'Выполнено',
    className: 'bg-emerald-500/15',
    textClass: 'text-emerald-400',
  },
  cancelled: {
    label: 'Отменено',
    className: 'bg-gray-500/15',
    textClass: 'text-gray-500',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <View className={`rounded-full px-3 py-1 ${config.className}`}>
      <Text variant="caption" weight="medium" className={config.textClass}>
        {config.label}
      </Text>
    </View>
  );
}
