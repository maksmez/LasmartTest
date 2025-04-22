using LasmartServer.Comments;
using System.Xml.Linq;

namespace LasmartServer.Points
{
    public class Point
    {
        public int Id { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public double Radius { get; set; }
        public string Color { get; set; }
        public List<Comment> Comments { get; set; } = new();
    }
}
