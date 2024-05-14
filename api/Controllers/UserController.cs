using System;
using System.Linq;
using System.Threading.Tasks;
using api.Filters;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public UserController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("{uuid}")]
        public async Task<IActionResult> GetUser(Guid uuid)
        {
            var user = await _context.Users
                .Include(u => u.UserType)
                .FirstOrDefaultAsync(u => u.Id == uuid);

            if (user == null)
            {
                return NotFound();
            }

            var userResponse = new
            {
                UUID = user.Id,
                Photo = user.Photo,
                Username = user.Username,
                Email = user.Email,
                UserType = user.UserType.Name,
                CreationDate = user.CreationDate
            };

            return Ok(userResponse);
        }

        [ServiceFilter(typeof(AdminAuthorizationFilter))]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users
                .Select(u => new { Id = u.Id, Username = u.Username })
                .ToListAsync();

            return Ok(users);
        }
    }
}