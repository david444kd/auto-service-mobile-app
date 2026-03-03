import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { RegisterForm } from "@/features/auth";

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0e0f12" }}>
      <RegisterForm onNavigateLogin={() => router.push("/(auth)/login")} />
    </SafeAreaView>
  );
}
