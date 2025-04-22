using LasmartServer.Data;
using Microsoft.EntityFrameworkCore;

namespace LasmartServer.Points
{
    public class PointService
    {
        private readonly AppDbContext _context;

        public PointService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Point>> GetAllAsync()
        {
            return await _context.Points.Include(p => p.Comments).ToListAsync();
        }

        public async Task<Point> AddAsync(Point point)
        {
            _context.Points.Add(point);
            await _context.SaveChangesAsync();
            return point;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var point = await _context.Points.FindAsync(id);
            if (point == null) return false;

            _context.Points.Remove(point);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Point?> UpdateAsync(Point updatedPoint)
        {
            var existPoint = await _context.Points.FindAsync(updatedPoint.Id);
            if (existPoint == null) return null;

            existPoint.X = updatedPoint.X;
            existPoint.Y = updatedPoint.Y;
            existPoint.Radius = updatedPoint.Radius;
            existPoint.Color = updatedPoint.Color;

            await _context.SaveChangesAsync();
            return existPoint;
        }
    }
}
