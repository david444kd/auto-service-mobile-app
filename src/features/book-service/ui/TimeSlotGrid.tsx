import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Text } from '@/shared/ui';
import type { TimeSlot } from '@/entities/time-slot';

interface TimeSlotGridProps {
  slots: TimeSlot[];
  selectedSlot: string | null;
  onSlotSelect: (slot: TimeSlot) => void;
  isLoading?: boolean;
}

export function TimeSlotGrid({ slots, selectedSlot, onSlotSelect, isLoading }: TimeSlotGridProps) {
  if (isLoading) {
    return (
      <View className="items-center py-6">
        <ActivityIndicator color="#f59e0b" />
        <Text variant="caption" color="muted" className="mt-2">
          Загрузка слотов...
        </Text>
      </View>
    );
  }

  if (slots.length === 0) {
    return (
      <View className="items-center py-6">
        <Text variant="body" color="muted">
          Нет доступных слотов на эту дату
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-row flex-wrap gap-2">
      {slots.map((slot) => {
        const isSelected = slot.scheduledAt === selectedSlot;
        const isDisabled = !slot.isAvailable;

        return (
          <TouchableOpacity
            key={slot.scheduledAt}
            onPress={() => !isDisabled && onSlotSelect(slot)}
            disabled={isDisabled}
            className={`rounded-xl px-4 py-3 ${
              isSelected
                ? 'bg-amber-500'
                : isDisabled
                  ? 'bg-[#1c1f28] opacity-30'
                  : 'bg-[#1c1f28]'
            }`}
            style={{ minWidth: 72 }}
          >
            <Text
              variant="label"
              weight="semibold"
              className={isSelected ? 'text-[#0e0f12]' : 'text-gray-300'}
              center
            >
              {slot.time}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
