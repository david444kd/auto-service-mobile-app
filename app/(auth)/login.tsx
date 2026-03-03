import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginForm } from "@/features/auth";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0e0f12" }}>
      <LoginForm onNavigateRegister={() => router.push("/(auth)/register")} />
    </SafeAreaView>
  );
}
