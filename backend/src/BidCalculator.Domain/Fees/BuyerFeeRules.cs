namespace BidCalculator.Domain.Fees;

public readonly record struct BuyerFeeRange(decimal Min, decimal Max);

public static class BuyerFeeRules
{
    public static BuyerFeeRange GetRange(VehicleType type)
    {
        if (type == VehicleType.Common) return new BuyerFeeRange(10m, 50m);
        return new BuyerFeeRange(25m, 200m);
    }
}
