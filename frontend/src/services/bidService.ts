import type { BidData, VehicleType } from "../types/bid";
import { NetworkError } from "../errors/NetworkError";
import { getAppConfig } from "../config/appConfig";
import type { HttpClient } from "../http/httpClient";
import { fetchHttpClient } from "../http/httpClient";
import type {
  BidMapper,
  BidCalculationResponseRaw,
} from "../mappers/bidMapper";
import { defaultBidMapper } from "../mappers/bidMapper";

export interface BidServiceDeps {
  http?: HttpClient;
  mapper?: BidMapper;
  apiBaseUrl?: string;
}

export interface BidService {
  calculateBid(basePrice: number, vehicleType: VehicleType): Promise<BidData>;
}

export function createBidService(deps: BidServiceDeps = {}): BidService {
  const http = deps.http ?? fetchHttpClient;
  const mapper = deps.mapper ?? defaultBidMapper;
  const apiBase = deps.apiBaseUrl ?? getAppConfig().apiBaseUrl;

  async function calculateBid(
    basePrice: number,
    vehicleType: VehicleType
  ): Promise<BidData> {
    if (basePrice <= 0) throw new Error("Base price must be > 0");
    const url = new URL("/api/bid/calculate", apiBase);
    url.search = new URLSearchParams({
      basePrice: String(basePrice),
      vehicleType,
    }).toString();
    try {
      const raw = await http.get<BidCalculationResponseRaw>(url.toString());
      return mapper.toDomain(raw);
    } catch (e) {
      if (e instanceof Error) throw e;
      throw new NetworkError("Unknown error occurred");
    }
  }

  return { calculateBid };
}

export const bidService = createBidService();
