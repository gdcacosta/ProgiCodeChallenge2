using BidCalculator.Domain.Fees;

namespace BidCalculator.Domain.Fees;

public sealed class BidCalculationResult
{
    public decimal BasePrice { get; }
    public VehicleType VehicleType { get; }
    public IReadOnlyDictionary<string, (string Description, decimal Amount)> Fees
    {
        get { return _fees; }
    }
    public decimal Total
    {
        get
        {
            decimal feesTotal = 0m;
            foreach (var feeEntry in _fees)
            {
                feesTotal += feeEntry.Value.Amount;
            }
            return BasePrice + feesTotal;
        }
    }

    private readonly Dictionary<string, (string Description, decimal Amount)> _fees = new();

    public BidCalculationResult(decimal basePrice, VehicleType vehicleType)
    {
        BasePrice = basePrice;
        VehicleType = vehicleType;
    }

    internal void Add(string code, string description, decimal amount)
    {
        _fees[code] = (description, amount);
    }
}
