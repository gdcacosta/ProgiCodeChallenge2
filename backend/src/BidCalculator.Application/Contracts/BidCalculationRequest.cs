using BidCalculator.Domain;

namespace BidCalculator.Application.Contracts;

public sealed record BidCalculationRequest(decimal BasePrice, VehicleType VehicleType);
