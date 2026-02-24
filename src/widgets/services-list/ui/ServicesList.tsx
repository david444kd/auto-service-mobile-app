import { View } from 'react-native';
import { ServiceCard } from '@/entities/service';
import type { Service } from '@/entities/service';

interface ServicesListProps {
  services: Service[];
  onServicePress: (service: Service) => void;
}

export function ServicesList({ services, onServicePress }: ServicesListProps) {
  return (
    <View className="gap-4">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} onPress={() => onServicePress(service)} />
      ))}
    </View>
  );
}
