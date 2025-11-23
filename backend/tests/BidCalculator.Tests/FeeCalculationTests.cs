using BidCalculator.Application.Contracts;
using BidCalculator.Application.Services;
using BidCalculator.Domain;
using BidCalculator.Domain.Fees;
using BidCalculator.Tests.TestData;
using Xunit;

namespace BidCalculator.Tests;

public class FeeCalculationTests
{
    private BidCalculationService CreateService()
    => new BidCalculationService();

    [Fact]
    public void Example_From_Requirements_Common_1000()
    {
        BidCalculationService service = CreateService();
        BidCalculationResponse response = service.Calculate(new BidCalculationRequest(CommonScenario.BasePrice, VehicleType.Common));

        Assert.Equal(CommonScenario.BasePrice, response.BasePrice);
        Assert.Equal(CommonScenario.ExpectedTotal, response.Total);

        var feesByCode = response.Fees.ToDictionary(f => f.Code, f => f.Amount);

        Assert.Equal(CommonScenario.ExpectedBasicBuyer, feesByCode[FeeCodes.BasicBuyer]);
        Assert.Equal(CommonScenario.ExpectedSpecial, feesByCode[FeeCodes.Special]);
        Assert.Equal(CommonScenario.ExpectedAssociation, feesByCode[FeeCodes.Association]);
        Assert.Equal(CommonScenario.ExpectedStorage, feesByCode[FeeCodes.Storage]);
    }

    [Theory]
    [InlineData(50, VehicleType.Common, 10)] 
    [InlineData(1000, VehicleType.Common, 50)] 
    [InlineData(100, VehicleType.Luxury, 25)] 
    [InlineData(5000, VehicleType.Luxury, 200)] 
    public void BuyerFee_MinMax(decimal basePrice, VehicleType type, decimal expectedBuyerFee)
    {
        BidCalculationService service = CreateService();
        BidCalculationResponse response = service.Calculate(new BidCalculationRequest(basePrice, type));
        FeeLineDto buyerFeeLine = FindFee(response.Fees, FeeCodes.BasicBuyer);
        Assert.Equal(expectedBuyerFee, buyerFeeLine.Amount);
    }

    [Theory]
    [InlineData(100, 5)]
    [InlineData(500, 5)]
    [InlineData(501, 10)]
    [InlineData(1000, 10)]
    [InlineData(1001, 15)]
    [InlineData(3000, 15)]
    [InlineData(3001, 20)]
    public void Association_Fee_Tiers(decimal basePrice, decimal expectedAssociationFee)
    {
        BidCalculationService service = CreateService();
        BidCalculationResponse response = service.Calculate(new BidCalculationRequest(basePrice, VehicleType.Common));
        FeeLineDto associationFeeLine = FindFee(response.Fees, FeeCodes.Association);
        Assert.Equal(expectedAssociationFee, associationFeeLine.Amount);
    }

    private static FeeLineDto FindFee(IEnumerable<FeeLineDto> fees, string code)
    {
        foreach (var fee in fees)
        {
            if (fee.Code == code)
                return fee;
        }
        throw new InvalidOperationException("Fee code not found: " + code);
    }
}
