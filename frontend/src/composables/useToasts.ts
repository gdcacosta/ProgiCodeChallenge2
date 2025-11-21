import { ref } from "vue";

export type ToastType = "info" | "success" | "error";

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
  timeout: number;
  createdAt: number;
}

const toastsRef = ref<Toast[]>([]);
let nextId = 1;

function removeToast(id: number) {
  toastsRef.value = toastsRef.value.filter((t) => t.id !== id);
}

function addToast(type: ToastType, message: string, duration = 4000) {
  const id = nextId++;
  const toast: Toast = {
    id,
    type,
    message,
    timeout: duration,
    createdAt: Date.now(),
  };
  toastsRef.value.push(toast);
  if (duration > 0) {
    setTimeout(() => removeToast(id), duration);
  }
  return id;
}

export function useToasts() {
  return {
    toasts: toastsRef,
    addToast,
    removeToast,
  };
}
