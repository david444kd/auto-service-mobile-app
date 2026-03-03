import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/authApi";

export function useSignIn() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.signInWithEmail(email, password),
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: ({ email, password, name }: { email: string; password: string; name: string }) =>
      authApi.signUpWithEmail(email, password, name),
  });
}

export function useSignOut() {
  return useMutation({
    mutationFn: () => authApi.signOut(),
  });
}
