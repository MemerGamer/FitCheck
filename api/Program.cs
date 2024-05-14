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

builder.Services.AddRouting(options => options.LowercaseUrls = true);

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

    if (!dbContext.Memberships.Any())
    {
        // Seed memberships
        var memberships = new[]
        {
            new Membership { Id = Guid.Parse("00000000-0000-0000-0000-000000000001"), Name = "Day Time", Price = 20.0, AccessHour = "06:00 - 10:00", MaxEntries = 30, Description = "Enjoy access to our facilities during the morning hours. Perfect for early birds and those with flexible schedules." },
            new Membership { Id = Guid.Parse("00000000-0000-0000-0000-000000000002"), Name = "Night Time", Price = 20.0, AccessHour = "20:00 - 00:00", MaxEntries = 30, Description = "Experience our facilities during the late evening hours. Ideal for those who prefer a quieter atmosphere and late-night workouts." },
            new Membership { Id = Guid.Parse("00000000-0000-0000-0000-000000000003"), Name = "Basic", Price = 40.0, AccessHour = "08:00 - 16:00", MaxEntries = 40, Description = "Our standard membership plan, providing access to all our facilities during regular business hours. Suitable for most individuals." },
            new Membership { Id = Guid.Parse("00000000-0000-0000-0000-000000000004"), Name = "Freebird", Price = 200.0, AccessHour = "Anytime", MaxEntries = 100, Description = "Our most flexible membership plan, offering unrestricted access to our facilities at any time. Perfect for those with busy schedules or who prefer complete freedom." },
            new Membership { Id = Guid.Parse("00000000-0000-0000-0000-000000000005"), Name = "Monthly", Price = 45.0, AccessHour = "08:00 - 16:00", MaxEntries = 40, Description = "A convenient month-to-month membership plan, providing access to our facilities during regular business hours. Ideal for those who prefer a shorter commitment." },
            new Membership { Id = Guid.Parse("00000000-0000-0000-0000-000000000006"), Name = "10x Membership", Price = 10.0, AccessHour = "08:00 - 16:00", MaxEntries = 10, Description = "A flexible plan that allows you to enjoy 10 visits to our facilities during regular business hours. Perfect for those who want to try out our services or have a limited need." },
            new Membership { Id = Guid.Parse("00000000-0000-0000-0000-000000000007"), Name = "50x Membership", Price = 50.0, AccessHour = "08:00 - 16:00", MaxEntries = 50, Description = "A value-packed plan that offers 50 visits to our facilities during regular business hours. Ideal for frequent users who want to save on their membership costs." },
            new Membership { Id = Guid.Parse("00000000-0000-0000-0000-000000000008"), Name = "100x Membership", Price = 100.0, AccessHour = "08:00 - 16:00", MaxEntries = 100, Description = "Our most popular multi-visit plan, providing 100 visits to our facilities during regular business hours. Perfect for dedicated individuals who want to make the most of their membership." },
            new Membership { Id = Guid.Parse("00000000-0000-0000-0000-000000000009"), Name = "250x Membership", Price = 200.0, AccessHour = "08:00 - 16:00", MaxEntries = 250, Description = "The ultimate choice for fitness enthusiasts, offering an incredible 250 visits to our facilities during regular business hours. Designed for those who are committed to their health and wellness journey." },
        };
        dbContext.Set<Membership>().AddRange(memberships);
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
