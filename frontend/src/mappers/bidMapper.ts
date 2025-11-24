import type { BidData, VehicleType } from "../types/bidTypes";

export interface FeeLineDtoRaw {
  code: string;
  description: string;
  amount: number;
}
export interface BidCalculationResponse {
  basePrice: number;
  VehicleType: VehicleType;
  fees: FeeLineDtoRaw[];
  total: number;
}

export interface BidMapper {
  toBidData(bid: BidCalculationResponse): BidData;
}

export const defaultBidMapper: BidMapper = {
  toBidData: (r: BidCalculationResponse) => ({
    basePrice: r.basePrice,
    total: r.total,
    fees: Array.isArray(r.fees)
      ? r.fees.map((f) => ({
          code: f.code,
          description: f.description,
          amount: f.amount,
        }))
      : [],
  }),
};
