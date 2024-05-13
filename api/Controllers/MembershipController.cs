using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("")]
    public class MembershipController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public MembershipController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("user/{userUuid}/memberships")]
        public async Task<IActionResult> GetMembershipsForUser(Guid userUuid)
        {
            var memberships = await _context.PurchaseHistory
                .Where(ph => ph.UserId == userUuid)
                .Join(
                    _context.Memberships,
                    ph => ph.MembershipId,
                    m => m.Id,
                    (ph, m) => new
                    {
                        Id = m.Id,
                        Name = m.Name,
                        AccessHour = m.AccessHour,
                        IsExpired = m.IsExpired,
                        CurrentEntries = m.CurrentEntries,
                        MaxEntries = m.MaxEntries
                    }
                )
                .ToListAsync();

            return Ok(memberships);
        }

        [HttpGet("user/{userUuid}/memberships/{membershipId}")]
        public async Task<IActionResult> GetMembershipForUser(Guid userUuid, Guid membershipId)
        {
            var membership = await _context.PurchaseHistory
                .Where(ph => ph.UserId == userUuid && ph.MembershipId == membershipId)
                .Join(
                    _context.Memberships,
                    ph => ph.MembershipId,
                    m => m.Id,
                    (ph, m) => new
                    {
                        Id = m.Id,
                        Name = m.Name,
                        Barcode = m.Barcode,
                        CurrentEntries = m.CurrentEntries,
                        MaxEntries = m.MaxEntries,
                        AccessHour = m.AccessHour,
                        Description = m.Description,
                        Price = m.Price,
                        IsExpired = m.IsExpired,
                        ExpirationDate = m.ExpirationDate,
                        PurchaseDate = ph.PurchaseDate
                    }
                )
                .FirstOrDefaultAsync();

            if (membership == null)
            {
                return NotFound();
            }

            return Ok(membership);
        }
    }
}