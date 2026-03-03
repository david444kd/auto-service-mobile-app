import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { firebaseAuth } from "@/shared/lib";
import { useAuthStore } from "@/shared/stores";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsub;
  }, [setUser, setLoading]);

  return <>{children}</>;
}
