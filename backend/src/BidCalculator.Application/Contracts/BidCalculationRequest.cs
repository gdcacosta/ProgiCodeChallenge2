using BidCalculator.Domain;
using System.ComponentModel.DataAnnotations;

namespace BidCalculator.Application.Contracts;

public sealed record BidCalculationRequest(
    [Required, Range(0.01, 1000000)] decimal BasePrice,
    [Required] VehicleType VehicleType);
