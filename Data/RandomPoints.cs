using LasmartServer.Comments;
using LasmartServer.Points;

namespace LasmartServer.Data
{
    public static class RandomPoints
    {
        public static void Seed(WebApplication app, int countPoints = 10)
        {
            using var scope = app.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            if (db.Points.Any()) return;

            var rnd = new Random();

            for (int i = 1; i <= countPoints; i++)
            {
                var point = new Point
                {
                    X = rnd.Next(0, 1900),
                    Y = rnd.Next(0, 700),
                    Radius = rnd.Next(5, 30),
                    Color = $"#{rnd.Next(0x1000000):X6}",
                    Comments = new List<Comment>
                    {
                        new Comment
                        {
                            Text = $"Коменнтарий № 1 для точки {i}",
                            BackgroundColor = $"#{rnd.Next(0x1000000):X6}"
                        },
                        new Comment
                        {
                            Text = $"Коменнтарий № 2 для точки {i}",
                            BackgroundColor = $"#{rnd.Next(0x1000000):X6}"
                        }
                    }
                };
                db.Points.Add(point);
            }
            db.SaveChanges();
        }
    }
}
