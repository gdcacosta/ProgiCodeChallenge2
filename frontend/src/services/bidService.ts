import type { BidData, VehicleType } from "../types/bidTypes";
import { getAppConfig } from "../config/appConfig";
import { fetchHttpClient } from "../http/httpClient";
import type { BidCalculationResponse } from "../mappers/bidMapper";
import { defaultBidMapper } from "../mappers/bidMapper";

export interface BidService {
  calculateBid(basePrice: number, vehicleType: VehicleType): Promise<BidData>;
}

function extractProblemDetailsError(e: any): string | null {
  if (e?.status === 400 && e?.errors) {
    const firstKey = Object.keys(e.errors)[0];
    return e.errors[firstKey][0];
  }
  return null;
}

export function createBidService(): BidService {
  const http = fetchHttpClient;
  const mapper = defaultBidMapper;
  const apiBase = getAppConfig().apiBaseUrl;

  async function calculateBid(
    basePrice: number,
    vehicleType: VehicleType
  ): Promise<BidData> {
    const url = new URL("/api/bid/calculate", apiBase);
    url.search = new URLSearchParams({
      basePrice: String(basePrice),
      vehicleType: String(vehicleType),
    }).toString();
    try {
      const response = await http.get<BidCalculationResponse>(url.toString());
      return mapper.toBidData(response);
    } catch (e: unknown) {
      const validationMessage = extractProblemDetailsError(e);

      if (validationMessage) {
        throw new Error(validationMessage);
      }

      throw new Error("Unexpected error during bid calculation");
    }
  }

  return { calculateBid };
}

export const bidService = createBidService();
