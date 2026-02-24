import { router } from 'expo-router';
import { useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQueryClient } from '@tanstack/react-query';
import { useBookings, BookingCard, bookingKeys } from '@/entities/booking';
import type { Booking } from '@/entities/booking';
import { CancelConfirmModal } from '@/features/cancel-booking';
import { Button, Text } from '@/shared/ui';

function isUpcoming(booking: Booking): boolean {
  return (
    (booking.status === 'pending' || booking.status === 'confirmed' || booking.status === 'in_progress') &&
    new Date(booking.scheduledAt) >= new Date()
  );
}

export function BookingsList() {
  const { data: bookings = [], isLoading } =
    useBookings();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
    setRefreshing(false);
  };

  const upcoming = bookings.filter(isUpcoming);
  const past = bookings.filter((b) => !isUpcoming(b));

  if (!isLoading && bookings.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-[#0e0f12]">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f59e0b" />
          }
        >
          <View className="px-4 pb-2 pt-8">
            <Text variant="h2" weight="bold" color="accent">
              Мои записи
            </Text>
          </View>
          <View className="flex-1 items-center justify-center gap-4 px-6">
            <Text className="text-5xl">🗓</Text>
            <Text variant="h3" weight="semibold" center>
              Нет записей
            </Text>
            <Text variant="body" color="secondary" center>
              Запишитесь на обслуживание, чтобы здесь появились ваши записи
            </Text>
            <Button variant="outline" onPress={() => router.navigate('/(tabs)')}>
              Записаться
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView className="flex-1 bg-[#0e0f12]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, padding: 16, gap: 16, paddingTop: 8 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f59e0b" />
        }
      >
        <Text variant="h2" weight="bold" color="accent" className="mb-2 pt-2">
          Мои записи
        </Text>

        {upcoming.length > 0 && (
          <View className="gap-3">
            <Text variant="h3" weight="semibold">
              Предстоящие
            </Text>
            {upcoming.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                variant="upcoming"
                onCancel={(id) => setCancelBookingId(id)}
              />
            ))}
          </View>
        )}

        {past.length > 0 && (
          <View className="gap-3">
            <Text variant="h3" weight="semibold">
              История
            </Text>
            {past.map((booking) => (
              <BookingCard key={booking.id} booking={booking} variant="past" />
            ))}
          </View>
        )}

        <View className="h-8" />
      </ScrollView>
      </SafeAreaView>

      <CancelConfirmModal
        bookingId={cancelBookingId}
        onClose={() => setCancelBookingId(null)}
      />
    </>
  );
}
