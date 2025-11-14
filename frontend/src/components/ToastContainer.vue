<template>
  <div class="toast-container" role="alert" aria-live="assertive">
    <div
      v-for="t in toasts"
      :key="t.id"
      class="toast"
      :class="t.type"
      @click="removeToast(t.id)"
    >
      <strong class="toast-type">{{ t.type.toUpperCase() }}</strong>
      <span class="toast-message">{{ t.message }}</span>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click.stop="removeToast(t.id)"
      >×</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useToasts } from "../composables/useToasts";
const { toasts, removeToast } = useToasts();
</script>
<style scoped>
.toast-container {
  position: fixed;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 1000;
  max-width: 320px;
}
.toast {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: #fff;
  border-radius: 6px;
  padding: 10px 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  line-height: 1.3;
  border-left: 4px solid #3a3a3a;
  cursor: pointer;
}
.toast.success { border-color: #2e7d32; }
.toast.error { border-color: #c62828; }
.toast.info { border-color: #1565c0; }
.toast-type {
  font-size: 11px;
  letter-spacing: 0.5px;
  opacity: 0.7;
}
.toast-message { flex: 1; }
.close {
  background: transparent;
  border: none;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  padding: 0 4px;
  color: #666;
}
.close:hover { color: #000; }
</style>