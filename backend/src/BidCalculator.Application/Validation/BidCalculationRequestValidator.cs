using BidCalculator.Application.Contracts;
using FluentValidation;

namespace BidCalculator.Application.Validation;

public sealed class BidCalculationRequestValidator : AbstractValidator<BidCalculationRequest>
{
    public BidCalculationRequestValidator()
    {
        RuleFor(r => r.BasePrice).GreaterThan(0);
        RuleFor(r => r.VehicleType).IsInEnum();
    }
}
