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
  const basePrice = ref<number>(options.initialBasePrice ?? 1000);
  const vehicleType = ref<VehicleType>(options.initialVehicleType ?? "Common");
  const loading = ref(false);
  const error = ref("");
  const data = ref<BidData | null>(null);
  const maxAllowed = 1_000_000;
  const basePriceError = computed(() => {
    if (basePrice.value === null || basePrice.value === undefined)
      return "Base price is required";
    if (Number.isNaN(basePrice.value)) return "Base price must be a number";
    if (basePrice.value <= 0) return "Base price must be greater than 0";
    if (basePrice.value > maxAllowed)
      return `Base price too large (max ${maxAllowed.toLocaleString()})`;
    return null;
  });

  let timer: number | undefined;
  let currentController: AbortController | null = null;

  async function executeFetch() {
    if (basePrice.value <= 0) {
      data.value = null;
      error.value = "";
      loading.value = false;
      return;
    }

    if (currentController) {
      currentController.abort();
    }
    currentController = new AbortController();
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
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (basePriceError.value) {
        data.value = null;
        return;
      }
      executeFetch();
    }, debounceMs);
  }

  watch([basePrice, vehicleType], scheduleFetch, { immediate: true });

  const total = computed(() => (data.value ? data.value.total : 0));

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
