using Microsoft.AspNetCore.Mvc;

namespace LasmartServer.Points
{
    [ApiController]
    [Route("api/points")]
    public class PointsController : ControllerBase
    {
        private readonly PointService _service;

        public PointsController(PointService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IEnumerable<Point>> Get() => await _service.GetAllAsync();

        [HttpPost("add")]
        public async Task<ActionResult<Point>> AddPoint([FromBody] Point point)
        {
            var created = await _service.AddAsync(point);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteAsync(id);
            return result ? Ok() : NotFound();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Point point)
        {
            if (id != point.Id) return BadRequest();
            var updated = await _service.UpdateAsync(point);
            return updated == null ? NotFound() : Ok(updated);
        }
    }
}
