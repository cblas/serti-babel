using Microsoft.AspNetCore.Mvc;
using serti.babel.app.Models;
using serti.babel.app.Services;

namespace serti.babel.app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationsController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var locations = LocationService.Get();
                return Ok(locations);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] LocationViewModel locationViewModel)
        {
            try
            {
                if (locationViewModel == null)
                    return BadRequest();

                string message = string.Empty;
                var isCreated = LocationService.Create(locationViewModel);
                message = isCreated ? "Saved" : "Not Saved";

                return Ok(new { message = message });
            }
            catch 
            {
                return StatusCode(500);
            }
        }

        [HttpPut]
        public IActionResult Update([FromBody] LocationViewModel locationViewModel)
        {
            try
            {
                if (locationViewModel.Id == null || locationViewModel == null)
                    return BadRequest();

                string message = string.Empty;
                var isUpdated = LocationService.Create(locationViewModel);
                message = isUpdated ? "Updated" : "Not Updated";

                return Ok(new { message = message });
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPost]
        [Route("Delete")]
        public IActionResult Delete([FromBody] int? idLocation)
        {
            try
            {
                if (idLocation == null)
                    return BadRequest();

                string message = string.Empty;
                var isoDeleted = LocationService.Delete((int)idLocation);
                message = isoDeleted ? "Deleted" : "Not Deleted";

                return Ok(new { message = message });
            }
            catch
            {
                return StatusCode(500);
            }
        }
    }
}
