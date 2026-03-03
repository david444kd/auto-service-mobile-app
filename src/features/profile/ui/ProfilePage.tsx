import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Alert, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";
import { useSignOut } from "@/entities/auth";
import { useCurrentUser, useProfileStore } from "@/shared/stores";
import { Button, Input, Text } from "@/shared/ui";

const profileSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа").or(z.literal("")),
  phone: z.string().min(10, "Введите корректный номер").or(z.literal("")),
  carMake: z.string(),
  carYear: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
  carPlateNumber: z.string(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfilePage() {
  const insets = useSafeAreaInsets();
  const user = useCurrentUser();
  const signOut = useSignOut();
  const { name, phone, carMake, carYear, carPlateNumber, setProfile } = useProfileStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name, phone, carMake, carYear, carPlateNumber },
  });

  const onSave = (data: ProfileFormValues) => {
    setProfile(data);
    Alert.alert("Сохранено", "Данные профиля обновлены");
  };

  const onSignOut = () => {
    const doSignOut = () => {
      signOut.mutateAsync(undefined).catch(() => {
        Alert.alert("Ошибка", "Не удалось выйти. Попробуйте ещё раз.");
      });
    };

    if (Platform.OS === "web") {
      if (window.confirm("Вы уверены, что хотите выйти?")) {
        doSignOut();
      }
    } else {
      Alert.alert("Выход", "Вы уверены, что хотите выйти?", [
        { text: "Отмена", style: "cancel" },
        { text: "Выйти", style: "destructive", onPress: doSignOut },
      ]);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-[#0e0f12]"
      contentContainerStyle={{ padding: 16, gap: 24, paddingTop: insets.top + 16, paddingBottom: 40 }}
    >
      {/* Заголовок */}
      <View className="gap-1">
        <Text variant="h2" weight="bold">Профиль</Text>
        <Text variant="body" color="muted">{user?.email}</Text>
      </View>

      {/* Личные данные */}
      <View className="gap-3">
        <Text variant="h3" weight="semibold">Личные данные</Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Имя"
              placeholder="Иван"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Телефон"
              placeholder="+7 (700) 000-00-00"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="phone-pad"
              error={errors.phone?.message}
            />
          )}
        />
      </View>

      {/* Автомобиль */}
      <View className="gap-3">
        <Text variant="h3" weight="semibold">Автомобиль</Text>

        <Controller
          control={control}
          name="carMake"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Марка и модель"
              placeholder="Toyota Camry"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.carMake?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="carYear"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Год выпуска"
              placeholder="2020"
              value={value ? String(value) : ""}
              onChangeText={(v) => onChange(v ? Number.parseInt(v, 10) : undefined)}
              onBlur={onBlur}
              keyboardType="numeric"
              error={errors.carYear?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="carPlateNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Гос. номер"
              placeholder="123 ABC 01"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="characters"
              error={errors.carPlateNumber?.message}
            />
          )}
        />
      </View>

      <Button variant="primary" fullWidth onPress={handleSubmit(onSave)}>
        Сохранить
      </Button>

      <Button variant="outline" fullWidth onPress={onSignOut} disabled={signOut.isPending}>
        {signOut.isPending ? "Выходим..." : "Выйти из аккаунта"}
      </Button>
    </ScrollView>
  );
}
