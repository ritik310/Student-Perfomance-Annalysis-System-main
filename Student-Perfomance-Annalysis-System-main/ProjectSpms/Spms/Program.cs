using Microsoft.EntityFrameworkCore;
using spms.Models;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
// builder.Services.AddDbContext<spms.Models.SiteDbContext>();
builder.Services.AddDbContext<SiteDbContext>(options =>
    options.UseMySQL("Data Source=localhost;Database=spms;User Id=root;Password=password"));

builder.Services.AddAuthentication()
                .AddCookie(option => option.LoginPath = "");
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.UseAuthentication();
app.UseAuthorization();
app.UseCors(permission => permission.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.MapDefaultControllerRoute();
app.Run();
