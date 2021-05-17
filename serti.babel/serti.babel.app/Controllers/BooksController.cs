using Microsoft.AspNetCore.Mvc;
using serti.babel.app.Models;
using serti.babel.app.Services;

namespace serti.babel.app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var books = BookService.Get();
                return Ok(books);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] BookViewModel bookViewModel)
        {
            try
            {
                if (bookViewModel == null)
                    return BadRequest();

                string message = string.Empty;
                var isCreated = BookService.Create(bookViewModel);
                message = isCreated ? "Saved" : "Not Saved";

                return Ok(new { message = message });
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPut]
        public IActionResult Update([FromBody] BookViewModel bookViewModel)
        {
            try
            {
                if (bookViewModel.Id == null || bookViewModel == null)
                    return BadRequest();

                string message = string.Empty;
                var isUpdated = BookService.Create(bookViewModel);
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
        public IActionResult Delete([FromBody] int? idBook)
        {
            try
            {
                if (idBook == null)
                    return BadRequest();

                string message = string.Empty;
                var isoDeleted = BookService.Delete((int)idBook);
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
