import type { BidData, VehicleType } from "../types/bidTypes";

export interface FeeLineDtoRaw {
  code: string;
  description: string;
  amount: number;
}
export interface BidCalculationResponseRaw {
  basePrice: number;
  VehicleType: VehicleType;
  fees: FeeLineDtoRaw[];
  total: number;
}

export interface BidMapper {
  toBidData(raw: BidCalculationResponseRaw): BidData;
}

export const defaultBidMapper: BidMapper = {
  toBidData: (r: BidCalculationResponseRaw) => ({
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
