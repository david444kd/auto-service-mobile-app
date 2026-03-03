import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProfileState {
  name: string;
  phone: string;
  carMake: string;
  carYear: number | undefined;
  carPlateNumber: string;
  setProfile: (data: Partial<Omit<ProfileState, 'setProfile'>>) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      name: '',
      phone: '',
      carMake: '',
      carYear: undefined,
      carPlateNumber: '',
      setProfile: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
