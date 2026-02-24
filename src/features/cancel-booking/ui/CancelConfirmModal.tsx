import { Modal, View } from 'react-native';
import { useCancelBooking } from '@/entities/booking';
import { Button, Card, Text } from '@/shared/ui';

interface CancelConfirmModalProps {
  bookingId: string | null;
  onClose: () => void;
}

export function CancelConfirmModal({ bookingId, onClose }: CancelConfirmModalProps) {
  const cancelBooking = useCancelBooking();
  const isVisible = Boolean(bookingId);

  const handleConfirm = async () => {
    if (!bookingId) return;
    try {
      await cancelBooking.mutateAsync(bookingId);
      onClose();
    } catch {
      onClose();
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/60 px-6">
        <Card variant="elevated" style={{ width: '100%' }}>
          <View className="gap-4">
            <Text variant="h3" weight="semibold" center>
              Отменить запись?
            </Text>
            <Text variant="body" color="secondary" center>
              Это действие нельзя отменить. Запись будет отменена.
            </Text>
            <View className="gap-2">
              <Button
                variant="primary"
                fullWidth
                onPress={handleConfirm}
                disabled={cancelBooking.isPending}
              >
                {cancelBooking.isPending ? 'Отменяем...' : 'Да, отменить'}
              </Button>
              <Button variant="ghost" fullWidth onPress={onClose}>
                Назад
              </Button>
            </View>
          </View>
        </Card>
      </View>
    </Modal>
  );
}
