namespace BidCalculator.Api.Configuration;

public static class CorsConfigurationExtensions
{
    public static IServiceCollection AddConfiguredCors(this IServiceCollection services, IConfiguration configuration)
    {
        var origins = configuration.GetSection("AllowedCorsOrigins").Get<string[]>() ?? Array.Empty<string>();
        services.AddCors(options =>
        {
            if (origins.Length == 0)
            {
                options.AddPolicy(CorsPolicies.AnyOrigin, p => p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            }
            else
            {
                options.AddPolicy(CorsPolicies.SpecificOrigins, p => p.AllowAnyHeader().AllowAnyMethod().WithOrigins(origins));
            }
        });
        return services;
    }
}
