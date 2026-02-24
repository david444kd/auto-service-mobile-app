import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCreateBooking } from '@/entities/booking';
import type { CreateBookingParams } from '@/entities/booking';
import { createBookingSchema } from '@/entities/booking';
import { MOCK_SERVICES } from '@/entities/service';
import { useTimeSlots } from '@/entities/time-slot';
import { Button, Input, Text } from '@/shared/ui';
import { DateSelector } from './DateSelector';
import { ServicePicker } from './ServicePicker';
import { TimeSlotGrid } from './TimeSlotGrid';

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function BookingForm() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedServiceId, setSelectedServiceId] = useState(MOCK_SERVICES[0].id);
  const { data: slots = [], isLoading: slotsLoading } = useTimeSlots(selectedServiceId, selectedDate);
  const createBooking = useCreateBooking();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CreateBookingParams>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      serviceId: MOCK_SERVICES[0].id,
      scheduledAt: '',
      car: { make: '', year: new Date().getFullYear(), plateNumber: '' },
      customerName: '',
      customerPhone: '',
      comment: '',
    },
    mode: 'onChange',
  });

  const selectedSlot = watch('scheduledAt');

  const handleServiceSelect = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setValue('serviceId', serviceId, { shouldValidate: true });
    setValue('scheduledAt', '');
  };

  const onSubmit = async (data: CreateBookingParams) => {
    try {
      await createBooking.mutateAsync(data);
      Alert.alert('Успех', 'Запись создана!', [
        {
          text: 'OK',
          onPress: () => router.replace('/(tabs)/bookings'),
        },
      ]);
    } catch {
      Alert.alert('Ошибка', 'Не удалось создать запись. Попробуйте ещё раз.');
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-[#0e0f12]"
      contentContainerStyle={{ padding: 16, gap: 20, paddingTop: insets.top + 16 }}
    >
      {/* Услуга */}
      <View className="gap-3">
        <Text variant="h3" weight="semibold">
          Услуга
        </Text>
        <ServicePicker
          services={MOCK_SERVICES}
          selectedServiceId={selectedServiceId}
          onSelect={(s) => handleServiceSelect(s.id)}
        />
      </View>

      {/* Дата и время */}
      <View className="gap-3">
        <Text variant="h3" weight="semibold">
          Дата и время
        </Text>
        <DateSelector
          selectedDate={selectedDate}
          onDateChange={(date) => {
            setSelectedDate(date);
            setValue('scheduledAt', '');
          }}
        />
        <TimeSlotGrid
          slots={slots}
          selectedSlot={selectedSlot}
          onSlotSelect={(slot) => setValue('scheduledAt', slot.scheduledAt, { shouldValidate: true })}
          isLoading={slotsLoading}
        />
        {errors.scheduledAt && (
          <Text variant="caption" color="error">
            {errors.scheduledAt.message}
          </Text>
        )}
      </View>

      {/* Автомобиль */}
      <View className="gap-3">
        <Text variant="h3" weight="semibold">
          Автомобиль
        </Text>

        <Controller
          control={control}
          name="car.make"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Марка и модель"
              placeholder="Toyota Camry"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.car?.make?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="car.year"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Год выпуска"
              placeholder="2020"
              value={value ? String(value) : ''}
              onChangeText={(v) => onChange(v ? Number.parseInt(v, 10) : 0)}
              onBlur={onBlur}
              keyboardType="numeric"
              error={errors.car?.year?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="car.plateNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Гос. номер"
              placeholder="123 ABC 01"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="characters"
              error={errors.car?.plateNumber?.message}
            />
          )}
        />
      </View>

      {/* Контакты */}
      <View className="gap-3">
        <Text variant="h3" weight="semibold">
          Контакты
        </Text>

        <Controller
          control={control}
          name="customerName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Имя"
              placeholder="Иван"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.customerName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="customerPhone"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Телефон"
              placeholder="+7 (700) 000-00-00"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="phone-pad"
              error={errors.customerPhone?.message}
            />
          )}
        />
      </View>

      {/* Комментарий */}
      <Controller
        control={control}
        name="comment"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Комментарий (необязательно)"
            placeholder="Дополнительная информация..."
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            multiline
            numberOfLines={3}
            style={{ height: 80, textAlignVertical: 'top' }}
          />
        )}
      />

      {/* Submit */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid || createBooking.isPending}
      >
        {createBooking.isPending ? 'Записываемся...' : 'Записаться'}
      </Button>

      <View className="h-8" />
    </ScrollView>
  );
}
