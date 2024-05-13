using api;
using api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<DatabaseContext>();

    dbContext.Database.Migrate();

    // Check if the UserType table is empty
    if (!dbContext.UserTypes.Any())
    {
        // Seed user types
        var userTypes = new[]
        {
            new UserType { Id = Guid.Parse("00000000-0000-0000-0000-000000000001"), Name = "Member" },
            new UserType { Id = Guid.Parse("00000000-0000-0000-0000-000000000002"), Name = "Admin" },
        };

        dbContext.Set<UserType>().AddRange(userTypes);
        dbContext.SaveChanges();
    }
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
