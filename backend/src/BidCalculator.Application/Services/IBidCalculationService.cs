using BidCalculator.Application.Contracts;

namespace BidCalculator.Application.Services;

public interface IBidCalculationService
{
    BidCalculationResponse Calculate(BidCalculationRequest request);
}
