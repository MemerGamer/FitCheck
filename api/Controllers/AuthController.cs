using api;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly DatabaseContext _context;

    public AuthController(DatabaseContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(api.Models.RegisterRequest request)
    {
        // Check if the email or username already exists
        if (_context.Users.Any(u => u.Email == request.Email || u.Username == request.Username))
        {
            return BadRequest("Email or username already exists.");
        }

        // Hash the password
        string hashedPassword = HashPassword(request.Password);

        // Create a new user
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            Username = request.Username,
            Password = hashedPassword,
            UserTypeId = Guid.Parse("00000000-0000-0000-0000-000000000001"), // Member user type
            Photo = "https://ui-avatars.com/api/?name=" + request.Username,
            CreationDate = DateTime.UtcNow
        };

        // Save the user to the database
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("User registered successfully.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        // Find the user by email
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null)
        {
            return BadRequest("Invalid email or password.");
        }

        // Verify the password
        if (!VerifyPassword(request.Password, user.Password))
        {
            return BadRequest("Invalid email or password.");
        }

        // Authentication successful - return user_id = user.id json
        var res = new { user_id = user.Id };
        return Ok(res);
    }
    private string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }
    }

    private bool VerifyPassword(string password, string hashedPassword)
    {
        string hashedInput = HashPassword(password);
        return hashedInput.Equals(hashedPassword);
    }
}