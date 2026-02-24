import { forwardRef } from 'react';
import {
  Text,
  TextInput,
  type TextInputProps,
  type TextInput as TextInputRef,
  View,
} from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<TextInputRef, InputProps>(
  ({ label, error, hint, className = '', ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <View className="w-full">
        {label && <Text className="mb-2 text-sm font-medium text-gray-300">{label}</Text>}

        <TextInput
          ref={ref}
          className={`rounded-xl border bg-[#1c1f28] px-4 py-3.5 text-base text-gray-100 ${
            hasError ? 'border-red-500' : 'border-[#2a2d38]'
          } ${className}`}
          placeholderTextColor="#4b5563"
          {...props}
        />

        {hint && !error && <Text className="mt-1.5 text-xs text-gray-500">{hint}</Text>}
        {error && <Text className="mt-1.5 text-xs text-red-400">{error}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';
