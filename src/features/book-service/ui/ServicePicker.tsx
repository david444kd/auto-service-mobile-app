import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import type { Service } from "@/entities/service";
import { Card, Text } from "@/shared/ui";

interface ServicePickerProps {
  services: Service[];
  selectedServiceId: string;
  isLoading?: boolean;
  onSelect: (service: Service) => void;
}

export function ServicePicker({
  services,
  selectedServiceId,
  isLoading,
  onSelect,
}: ServicePickerProps) {
  if (isLoading) {
    return (
      <View className="items-center py-6">
        <ActivityIndicator color="#f59e0b" />
      </View>
    );
  }

  if (services.length === 0) {
    return (
      <View className="items-center py-6">
        <Text variant="caption" color="muted">
          Услуги не найдены
        </Text>
      </View>
    );
  }

  return (
    <View className="gap-2">
      {services.map((service) => {
        const isSelected = service.id === selectedServiceId;
        return (
          <TouchableOpacity key={service.id} onPress={() => onSelect(service)} activeOpacity={0.75}>
            <Card
              variant={isSelected ? "elevated" : "default"}
              style={isSelected ? { borderWidth: 1.5, borderColor: "#f59e0b" } : undefined}
            >
              <View className="flex-row items-center gap-3">
                <View
                  className={`h-10 w-10 items-center justify-center rounded-xl ${isSelected ? "bg-amber-500/20" : "bg-[#0e0f12]"}`}
                >
                  <Text className="text-xl">{service.emoji}</Text>
                </View>
                <View className="flex-1">
                  <Text variant="body" weight={isSelected ? "semibold" : undefined}>
                    {service.name}
                  </Text>
                  <View className="mt-0.5 flex-row items-center gap-3">
                    <Text variant="caption" color="accent">
                      от {service.priceFrom.toLocaleString("ru-RU")} ₸
                    </Text>
                    <Text variant="caption" color="muted">
                      ~{service.durationMinutes} мин
                    </Text>
                  </View>
                </View>
                {isSelected && (
                  <View className="h-5 w-5 items-center justify-center rounded-full bg-amber-500">
                    <Text className="text-[10px] font-bold text-[#0e0f12]">✓</Text>
                  </View>
                )}
              </View>
            </Card>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
