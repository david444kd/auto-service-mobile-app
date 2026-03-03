import AsyncStorage from "@react-native-async-storage/async-storage";
import { type Auth, initializeAuth } from "firebase/auth";
import { firebaseApp } from "./app";

// getReactNativePersistence lives only in the react-native bundle of @firebase/auth.
// Metro resolves the react-native export condition at runtime (unstable_conditionNames).
// TypeScript sees browser types and doesn't know about it, so we suppress below.
// biome-ignore lint/suspicious/noTsIgnore: needed for cross-platform Firebase persistence
// @ts-ignore
import { getReactNativePersistence } from "@firebase/auth";

export const firebaseAuth: Auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
