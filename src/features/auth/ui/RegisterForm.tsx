import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { useSignUp } from "@/entities/auth";
import { type RegisterFormValues, registerSchema } from "@/entities/auth";
import { Button, Input } from "@/shared/ui";

interface RegisterFormProps {
  onNavigateLogin?: () => void;
}

export function RegisterForm({ onNavigateLogin }: RegisterFormProps) {
  const signUp = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    signUp.mutate({ email: data.email, password: data.password, name: data.name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <Text style={styles.subtitle}>Создайте новый аккаунт</Text>

      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              label="Имя"
              placeholder="Иван Иванов"
              autoComplete="name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              label="Email"
              placeholder="example@mail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              label="Пароль"
              placeholder="Минимум 6 символов"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
            />
          )}
        />

        {signUp.error && (
          <Text style={styles.errorText}>{(signUp.error as Error)?.message}</Text>
        )}

        <Button fullWidth onPress={handleSubmit(onSubmit)} disabled={signUp.isPending}>
          {signUp.isPending ? "Загрузка..." : "Зарегистрироваться"}
        </Button>

        <Button fullWidth variant="ghost" onPress={onNavigateLogin}>
          Уже есть аккаунт? Войти
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#94a3b8",
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  errorText: {
    color: "#f87171",
    fontSize: 14,
    textAlign: "center",
  },
});
