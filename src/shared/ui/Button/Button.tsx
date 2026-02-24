import { useState } from 'react';
import { Pressable, type PressableProps, StyleSheet, Text, type ViewStyle } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantConfig: Record<
  ButtonVariant,
  { bg: string; bgPressed: string; textColor: string; borderColor?: string }
> = {
  primary: { bg: '#f59e0b', bgPressed: '#d97706', textColor: '#0e0f12' },
  secondary: { bg: '#1e2028', bgPressed: '#2a2d38', textColor: '#f1f5f9' },
  outline: { bg: 'transparent', bgPressed: 'rgba(245,158,11,0.1)', textColor: '#f59e0b', borderColor: '#f59e0b' },
  ghost: { bg: 'transparent', bgPressed: 'rgba(255,255,255,0.06)', textColor: '#94a3b8' },
};

const sizeConfig: Record<ButtonSize, { py: number; px: number; radius: number; fontSize: number }> = {
  sm: { py: 8, px: 16, radius: 10, fontSize: 13 },
  md: { py: 12, px: 20, radius: 12, fontSize: 15 },
  lg: { py: 15, px: 24, radius: 14, fontSize: 17 },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled,
  style,
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  const v = variantConfig[variant];
  const s = sizeConfig[size];

  return (
    <Pressable
      disabled={disabled}
      onPressIn={(e) => { setPressed(true); onPressIn?.(e); }}
      onPressOut={(e) => { setPressed(false); onPressOut?.(e); }}
      style={[
        styles.base,
        {
          backgroundColor: pressed && !disabled ? v.bgPressed : v.bg,
          paddingVertical: s.py,
          paddingHorizontal: s.px,
          borderRadius: s.radius,
          borderWidth: v.borderColor ? 1.5 : 0,
          borderColor: v.borderColor ?? 'transparent',
          opacity: disabled ? 0.45 : 1,
          width: fullWidth ? '100%' : undefined,
        },
        style as ViewStyle,
      ]}
      {...props}
    >
      <Text style={[styles.text, { color: v.textColor, fontSize: s.fontSize }]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
