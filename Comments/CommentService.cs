using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LasmartServer.Data;
using Microsoft.EntityFrameworkCore;

namespace LasmartServer.Comments
{
    public class CommentService
    {
        private readonly AppDbContext _context;

        public CommentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Comment> AddAsync(Comment comment)
        {
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task<Comment?> UpdateAsync(Comment comment)
        {
            var existing = await _context.Comments.FindAsync(comment.Id);
            if (existing == null) return null;

            existing.Text = comment.Text;
            existing.BackgroundColor = comment.BackgroundColor;

            await _context.SaveChangesAsync();
            return existing;
        }
    }
}
