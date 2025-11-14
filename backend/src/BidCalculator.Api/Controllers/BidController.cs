using BidCalculator.Application.Contracts;
using BidCalculator.Application.Services;
using BidCalculator.Domain;
using Microsoft.AspNetCore.Mvc;

namespace BidCalculator.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BidController : ControllerBase
{
    private readonly IBidCalculationService _service;

    public BidController(IBidCalculationService service) => _service = service;

    [HttpGet("calculate")]
    [ProducesResponseType(typeof(BidCalculationResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<BidCalculationResponse> Calculate([FromQuery] decimal basePrice, [FromQuery] VehicleType vehicleType)
    {
        var request = new BidCalculationRequest(basePrice, vehicleType);
        if (!TryValidateModel(request))
        {
            return BadRequest(ModelState);
        }
        var result = _service.Calculate(request);
        return Ok(result);
    }

}
