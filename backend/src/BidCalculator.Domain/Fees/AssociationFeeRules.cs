namespace BidCalculator.Domain.Fees;

public enum AssociationFeeRange
{
    UpTo500,
    UpTo1000,
    UpTo3000,
    Above3000
}

public static class AssociationFeeRules
{
    public static AssociationFeeRange ResolveRange(decimal basePrice)
    {
        if (basePrice <= 500m) return AssociationFeeRange.UpTo500;
        if (basePrice <= 1000m) return AssociationFeeRange.UpTo1000;
        if (basePrice <= 3000m) return AssociationFeeRange.UpTo3000;
        return AssociationFeeRange.Above3000;
    }

    public static decimal GetFee(AssociationFeeRange range)
    {
        if (range == AssociationFeeRange.UpTo500) return 5m;
        if (range == AssociationFeeRange.UpTo1000) return 10m;
        if (range == AssociationFeeRange.UpTo3000) return 15m;
        return 20m;
    }
}
