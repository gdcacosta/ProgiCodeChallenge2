using BidCalculator.Application.Contracts;
using BidCalculator.Domain.Fees;

namespace BidCalculator.Application.Services;

public sealed class BidCalculationService : IBidCalculationService
{

    public BidCalculationResponse Calculate(BidCalculationRequest request)
    {

            var domainResult = BidCalculatorEngine.Calculate(request.BasePrice, request.VehicleType);

            var feeDtos = domainResult.Fees
                .Select(kv => new FeeLineDto(kv.Key, kv.Value.Description, kv.Value.Amount))
                .ToList();

            return new BidCalculationResponse(
                domainResult.BasePrice,
                domainResult.VehicleType,
                feeDtos,
                domainResult.Total
            );

    }
}
