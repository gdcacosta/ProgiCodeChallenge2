import { ref, computed, watch } from "vue";
import { bidService } from "../services/bidService";
import type { BidData, VehicleType } from "../types/bidTypes";

interface UseBidCalculationOptions {
  debounceMs?: number;
  initialBasePrice?: number;
  initialVehicleType?: VehicleType;
}

export function useBidCalculation(options: UseBidCalculationOptions = {}) {
  const debounceMs = options.debounceMs ?? 400;

  const basePrice = ref(options.initialBasePrice ?? 1000);
  const vehicleType = ref<VehicleType>(options.initialVehicleType ?? "Common");

  const loading = ref(false);
  const error = ref("");
  const data = ref<BidData | null>(null);

  const MAX_ALLOWED = 1_000_000;

  const basePriceError = computed(() => {
    const v = basePrice.value;
    if (v == null) return "Base price is required";
    if (Number.isNaN(v)) return "Base price must be a number";
    if (v <= 0) return "Base price must be greater than 0";
    if (v > MAX_ALLOWED)
      return `Base price too large (max ${MAX_ALLOWED.toLocaleString()})`;
    return null;
  });

  let timer: number | undefined;

  async function executeFetch() {
    if (basePriceError.value) {
      data.value = null;
      return;
    }

    loading.value = true;
    error.value = "";

    try {
      data.value = await bidService.calculateBid(
        basePrice.value,
        vehicleType.value
      );
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e.message || "Unknown error";
      } else {
        error.value = "Unknown error";
      }
      data.value = null;
    } finally {
      loading.value = false;
    }
  }

  function scheduleFetch() {
    clearTimeout(timer);
    timer = window.setTimeout(executeFetch, debounceMs);
  }

  watch([basePrice, vehicleType], scheduleFetch, { immediate: true });

  const total = computed(() => data.value?.total ?? 0);

  return {
    basePrice,
    vehicleType,
    loading,
    error,
    data,
    total,
    basePriceError,
  };
}
