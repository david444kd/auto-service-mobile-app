import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth } from "@/shared/lib";

export const authApi = {
  signInWithEmail: async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return credential.user;
  },

  signUpWithEmail: async (email: string, password: string, name: string) => {
    const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    await updateProfile(credential.user, { displayName: name });
    return credential.user;
  },

  signOut: async () => {
    await firebaseSignOut(firebaseAuth);
  },
};
