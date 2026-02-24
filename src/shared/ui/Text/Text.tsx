import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'bodyLarge' | 'caption' | 'label';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
type TextColor = 'primary' | 'secondary' | 'muted' | 'accent' | 'error';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  color?: TextColor;
  center?: boolean;
}

const variantStyles: Record<TextVariant, string> = {
  h1: 'text-3xl',
  h2: 'text-2xl',
  h3: 'text-xl',
  bodyLarge: 'text-lg',
  body: 'text-base',
  label: 'text-sm',
  caption: 'text-xs',
};

const weightStyles: Record<TextWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorStyles: Record<TextColor, string> = {
  primary: 'text-gray-100',
  secondary: 'text-gray-400',
  muted: 'text-gray-500',
  accent: 'text-amber-400',
  error: 'text-red-400',
};

export function Text({
  children,
  variant = 'body',
  weight = 'normal',
  color = 'primary',
  center = false,
  className = '',
  ...props
}: TextProps) {
  const combinedClassName = [
    variantStyles[variant],
    weightStyles[weight],
    colorStyles[color],
    center ? 'text-center' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <RNText className={combinedClassName} {...props}>
      {children}
    </RNText>
  );
}
