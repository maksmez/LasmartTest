using LasmartServer.Comments;
using Microsoft.AspNetCore.Mvc;

namespace backend.Comments
{
    [ApiController]
    [Route("api/comments")]
    public class CommentsController : ControllerBase
    {
        private readonly CommentService _service;

        public CommentsController(CommentService service)
        {
            _service = service;
        }

        [HttpPost("add")]
        public async Task<Comment> Post(Comment comment) => await _service.AddAsync(comment);

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Comment comment)
        {
            if (id != comment.Id) return BadRequest();
            var updated = await _service.UpdateAsync(comment);
            return updated == null ? NotFound() : Ok(updated);
        }
    }
}
