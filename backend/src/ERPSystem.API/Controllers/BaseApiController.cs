using Microsoft.AspNetCore.Mvc;

namespace ERPSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseApiController : ControllerBase
    {
        protected IActionResult HandleException(Exception ex)
        {
            // Log the exception here
            return StatusCode(500, new { message = "An error occurred while processing your request.", error = ex.Message });
        }

        protected IActionResult NotFound(string message)
        {
            return NotFound(new { message });
        }

        protected IActionResult BadRequest(string message)
        {
            return BadRequest(new { message });
        }
    }
} 