export type VehicleType = "Common" | "Luxury";

export interface Fee {
  code: string;
  description: string;
  amount: number;
}

export interface BidData {
  basePrice: number;
  total: number;
  fees: Fee[];
}
