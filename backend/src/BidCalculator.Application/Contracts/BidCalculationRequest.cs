using BidCalculator.Domain;
using System.ComponentModel.DataAnnotations;

namespace BidCalculator.Application.Contracts;

public sealed record BidCalculationRequest(
     decimal BasePrice,
     VehicleType VehicleType);
