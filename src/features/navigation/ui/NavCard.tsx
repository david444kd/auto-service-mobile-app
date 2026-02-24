import { forwardRef } from 'react';
import { Pressable, type PressableProps, View, type View as ViewRef } from 'react-native';
import { Text } from '@/shared/ui';

interface NavCardProps extends Omit<PressableProps, 'children'> {
  emoji: string;
  title: string;
  description: string;
}

export const NavCard = forwardRef<ViewRef, NavCardProps>(
  ({ emoji, title, description, ...props }, ref) => {
    return (
      <Pressable ref={ref} {...props}>
        {({ pressed }) => (
          <View
            className={`rounded-xl border border-slate-700 bg-slate-800 p-5 ${
              pressed ? 'opacity-80' : ''
            }`}
          >
            <Text className="mb-3 text-3xl">{emoji}</Text>
            <Text variant="h3" weight="semibold" className="mb-2">
              {title}
            </Text>
            <Text variant="label" color="secondary" className="leading-5">
              {description}
            </Text>
          </View>
        )}
      </Pressable>
    );
  }
);

NavCard.displayName = 'NavCard';
