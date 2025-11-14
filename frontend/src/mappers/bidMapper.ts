import type { BidData, VehicleType } from "../types/bid";

export interface FeeLineDtoRaw {
  Code: string;
  Description: string;
  Amount: number;
}
export interface BidCalculationResponseRaw {
  BasePrice: number;
  VehicleType: VehicleType;
  Fees: FeeLineDtoRaw[];
  Total: number;
}

export interface BidMapper {
  toDomain(raw: BidCalculationResponseRaw): BidData;
}

export const defaultBidMapper: BidMapper = {
  toDomain: (r: any) => ({
    basePrice: r.basePrice ?? r.BasePrice,
    total: r.total ?? r.Total,
    fees: Array.isArray(r.fees ?? r.Fees)
      ? (r.fees ?? r.Fees).map((f: any) => ({
          code: f.code ?? f.Code,
          description: f.description ?? f.Description,
          amount: f.amount ?? f.Amount,
        }))
      : [],
  }),
};
