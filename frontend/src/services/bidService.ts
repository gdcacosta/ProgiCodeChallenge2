import type { BidData, VehicleType } from "../types/bidTypes";
import { getAppConfig } from "../config/appConfig";
import type { HttpClient } from "../http/httpClient";
import { fetchHttpClient } from "../http/httpClient";
import type { BidMapper, BidCalculationResponse } from "../mappers/bidMapper";
import { defaultBidMapper } from "../mappers/bidMapper";

export interface BidServiceConfig {
  http?: HttpClient;
  mapper?: BidMapper;
  apiBaseUrl?: string;
}

export interface BidService {
  calculateBid(basePrice: number, vehicleType: VehicleType): Promise<BidData>;
}

export function createBidService(config: BidServiceConfig = {}): BidService {
  const http = config.http ?? fetchHttpClient;
  const mapper = config.mapper ?? defaultBidMapper;
  const apiBase = config.apiBaseUrl ?? getAppConfig().apiBaseUrl;

  async function calculateBid(
    basePrice: number,
    vehicleType: VehicleType
  ): Promise<BidData> {
    const url = new URL("/api/bid/calculate", apiBase);
    url.search = new URLSearchParams({
      basePrice: String(basePrice),
      vehicleType,
    }).toString();
    try {
      const response = await http.get<BidCalculationResponse>(url.toString());
      return mapper.toBidData(response);
    } catch (e) {
      if (e instanceof Error) throw e;
      throw new Error("Unknown error occurred during bid calculation");
    }
  }

  return { calculateBid };
}

export const bidService = createBidService();
