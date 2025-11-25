export enum VehicleType {
  Common = 0,
  Luxury = 1,
}

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
