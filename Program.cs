using LasmartServer.Comments;
using LasmartServer.Data;
using LasmartServer.Points;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("PointDb"));
builder.Services.AddScoped<PointService>();
builder.Services.AddScoped<CommentService>();

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();
app.UseCors();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

//Генерация 10 случайных точек
RandomPoints.Seed(app, 10);

app.Run();