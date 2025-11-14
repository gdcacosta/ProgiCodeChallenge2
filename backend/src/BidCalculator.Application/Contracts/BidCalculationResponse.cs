using BidCalculator.Domain;

namespace BidCalculator.Application.Contracts;

public sealed record BidCalculationResponse(
    decimal BasePrice,
    VehicleType VehicleType,
    IReadOnlyList<FeeLineDto> Fees,
    decimal Total
);
