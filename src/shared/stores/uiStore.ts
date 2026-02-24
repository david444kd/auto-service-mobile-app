import { create } from 'zustand';

// Общее UI-состояние — см. SPECIFICATION.md раздел 7
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface UIState {
  isLoading: boolean;
  loadingMessage: string | null;
  toasts: Toast[];
  activeModal: string | null;
  modalData: Record<string, unknown> | null;

  setLoading: (loading: boolean, message?: string) => void;
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
  clearToasts: () => void;
  openModal: (modalId: string, data?: Record<string, unknown>) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  loadingMessage: null,
  toasts: [],
  activeModal: null,
  modalData: null,

  setLoading: (loading, message) =>
    set({ isLoading: loading, loadingMessage: loading ? (message ?? null) : null }),

  showToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: `toast-${Date.now()}` }],
    })),

  hideToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

  clearToasts: () => set({ toasts: [] }),

  openModal: (modalId, data) => set({ activeModal: modalId, modalData: data ?? null }),

  closeModal: () => set({ activeModal: null, modalData: null }),
}));

// Хуки-селекторы
export const useIsLoading = () => useUIStore((s) => s.isLoading);
export const useToasts = () => useUIStore((s) => s.toasts);
export const useActiveModal = () => useUIStore((s) => s.activeModal);
