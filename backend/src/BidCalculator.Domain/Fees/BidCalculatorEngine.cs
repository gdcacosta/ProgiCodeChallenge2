namespace BidCalculator.Domain.Fees;

public static class BidCalculatorEngine
{

    public static BidCalculationResult Calculate(decimal basePrice, VehicleType vehicleType)
    {
        if (basePrice <= 0)
            throw new ArgumentOutOfRangeException(nameof(basePrice), "Base price must be greater than zero.");

        var result = new BidCalculationResult(basePrice, vehicleType);

   
        var rawBuyer = basePrice * FeeRates.BuyerPercent;
        var buyerRange = BuyerFeeRules.GetRange(vehicleType);
        var buyerFee = Math.Clamp(rawBuyer, buyerRange.Min, buyerRange.Max);
        result.Add(FeeCodes.BasicBuyer, $"Basic buyer fee ({FeeRates.BuyerPercent:P0}, min {buyerRange.Min:C0}, max {buyerRange.Max:C0})", Round2(buyerFee));

        var specialPercent = vehicleType == VehicleType.Common ? FeeRates.CommonSpecialPercent : FeeRates.LuxurySpecialPercent;
        var specialFee = basePrice * specialPercent;
        result.Add(FeeCodes.Special, $"Seller special fee ({specialPercent:P0})", Round2(specialFee));

        
        var association = CalculateAssociationFee(basePrice);
        result.Add(FeeCodes.Association, "Association fee (tiered)", association);

    
        result.Add(FeeCodes.Storage, "Fixed storage fee", FeeRates.Storage);

        return result;
    }

    private static decimal CalculateAssociationFee(decimal basePrice)
    {
        var range = AssociationFeeRules.ResolveRange(basePrice);
        return AssociationFeeRules.GetFee(range);
    }

    private static decimal Round2(decimal value)
    {
        return Math.Round(value, 2, MidpointRounding.AwayFromZero);
    }
}
