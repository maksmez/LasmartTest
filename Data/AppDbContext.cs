using Microsoft.EntityFrameworkCore;
using LasmartServer.Comments;
using LasmartServer.Points;

namespace LasmartServer.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Point> Points { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Point>()
            .HasMany(p => p.Comments)
            .WithOne()
            .HasForeignKey(c => c.PointId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
