import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { useSignIn } from "@/entities/auth";
import { type LoginFormValues, loginSchema } from "@/entities/auth";
import { Button, Input } from "@/shared/ui";

interface LoginFormProps {
  onNavigateRegister?: () => void;
}

export function LoginForm({ onNavigateRegister }: LoginFormProps) {
  const signIn = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    signIn.mutate({ email: data.email, password: data.password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Войти</Text>
      <Text style={styles.subtitle}>Войдите в свой аккаунт</Text>

      <View style={styles.form}>
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

        {signIn.error && (
          <Text style={styles.errorText}>
            {(signIn.error as Error)?.message}
          </Text>
        )}

        <Button fullWidth onPress={handleSubmit(onSubmit)} disabled={signIn.isPending}>
          {signIn.isPending ? "Загрузка..." : "Войти"}
        </Button>

        <Button fullWidth variant="ghost" onPress={onNavigateRegister}>
          Нет аккаунта? Зарегистрироваться
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
