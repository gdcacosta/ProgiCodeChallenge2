using BidCalculator.Application.Services;
using BidCalculator.Application.Validation;
using FluentValidation;
using FluentValidation.AspNetCore;
using BidCalculator.Api.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerDocumentation(builder.Configuration);
builder.Services.AddScoped<IBidCalculationService, BidCalculationService>();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<BidCalculationRequestValidator>();
builder.Services.AddHealthChecks();
builder.Services.AddConfiguredCors(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var origins = app.Configuration.GetSection("AllowedCorsOrigins").Get<string[]>() ?? Array.Empty<string>();
var selectedPolicy = origins.Length == 0 ? CorsPolicies.AnyOrigin : CorsPolicies.SpecificOrigins;
app.UseHttpsRedirection();
app.UseCors(selectedPolicy);
app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");

app.Run();
