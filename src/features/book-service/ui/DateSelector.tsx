import { ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/shared/ui';

interface DateSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

function getDays(count: number): Array<{ date: string; label: string; dayLabel: string }> {
  const days = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString('ru-RU', { weekday: 'short' });
    const label = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    days.push({ date: dateStr, label, dayLabel });
  }

  return days;
}

export function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
  const days = getDays(14);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingHorizontal: 4 }}
    >
      {days.map(({ date, label, dayLabel }) => {
        const isSelected = date === selectedDate;

        return (
          <TouchableOpacity
            key={date}
            onPress={() => onDateChange(date)}
            className={`items-center rounded-xl px-3 py-3 ${
              isSelected ? 'bg-amber-500' : 'bg-[#1c1f28]'
            }`}
            style={{ minWidth: 60 }}
          >
            <Text
              variant="caption"
              weight="medium"
              className={isSelected ? 'text-[#0e0f12]' : 'text-gray-500'}
            >
              {dayLabel}
            </Text>
            <Text
              variant="label"
              weight="semibold"
              className={isSelected ? 'text-[#0e0f12]' : 'text-gray-200'}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
