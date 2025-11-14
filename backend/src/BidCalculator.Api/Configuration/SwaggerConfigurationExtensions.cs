using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace BidCalculator.Api.Configuration;

public static class SwaggerConfigurationExtensions
{
    public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services, IConfiguration configuration)
    {
        var section = configuration.GetSection("Swagger");
        var title = section["Title"] ?? "API";
        var version = section["Version"] ?? "v1";
        var description = section["Description"] ?? string.Empty;

        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc(version, new OpenApiInfo
            {
                Title = title,
                Version = version,
                Description = description
            });
        });
        return services;
    }
}
