using BidCalculator.Domain;

namespace BidCalculator.Application.Contracts;

public sealed record BidCalculationResponse(
    decimal BasePrice,
    IReadOnlyList<FeeLineDto> Fees,
    decimal Total
);
