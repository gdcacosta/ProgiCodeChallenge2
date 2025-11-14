namespace BidCalculator.Application.Contracts;

public sealed record FeeLineDto(string Code, string Description, decimal Amount);
