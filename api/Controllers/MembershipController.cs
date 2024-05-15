using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Threading.Tasks;
using api.Filters;
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
            var memberships = await _context.PurchasedMemberships
                .Where(ph => ph.UserId == userUuid)
                .Join(
                    _context.Memberships,
                    ph => ph.MembershipId,
                    m => m.Id,
                    (ph, m) => new
                    {
                        Id = ph.Id,
                        Name = m.Name,
                        AccessHour = m.AccessHour,
                        IsExpired = ph.IsExpired,
                        CurrentEntries = ph.CurrentEntries,
                        MaxEntries = m.MaxEntries,
                        RemainingEntries = m.MaxEntries - ph.CurrentEntries
                    }
                )
                .OrderBy(m => m.IsExpired)
                .ThenBy(m => m.RemainingEntries)
                .ToListAsync();

            return Ok(memberships);
        }

        [HttpGet("user/{userUuid}/memberships/{purchasedMembershipId}")]
        public async Task<IActionResult> GetMembershipForUser(Guid userUuid, Guid purchasedMembershipId)
        {
            var membership = await _context.PurchasedMemberships
                .Where(ph => ph.UserId == userUuid && ph.Id == purchasedMembershipId)
                .Join(
                    _context.Memberships,
                    ph => ph.MembershipId,
                    m => m.Id,
                    (ph, m) => new
                    {
                        Id = ph.Id,
                        Name = m.Name,
                        Description = m.Description,
                        Barcode = ph.Barcode,
                        AccessHour = m.AccessHour,
                        IsExpired = ph.IsExpired,
                        CurrentEntries = ph.CurrentEntries,
                        MaxEntries = m.MaxEntries,
                        PurchaseDate = ph.PurchaseDate,
                        ExpirationDate = ph.ExpirationDate,
                        Price = m.Price
                    }
                )
                .FirstOrDefaultAsync();

            if (membership == null)
            {
                return NotFound();
            }

            return Ok(membership);
        }


        [ServiceFilter(typeof(AdminAuthorizationFilter))]
        [HttpGet("memberships")]
        public async Task<IActionResult> GetAllMemberships()
        {
            var memberships = await _context.Memberships.ToListAsync();
            return Ok(memberships);
        }

        [ServiceFilter(typeof(AdminAuthorizationFilter))]
        [HttpPost("/memberships/scan/{purchasedMembershipId}")]
        public async Task<IActionResult> ScanBarcode(Guid purchasedMembershipId)
        {
            var membership = await _context.PurchasedMemberships
                .Where(ph => ph.Id == purchasedMembershipId)
                .FirstOrDefaultAsync();

            if (membership == null)
            {
                return NotFound();
            }

            if (!membership.IsExpired)
            {

                // Make the CurrentEntries greater by one
                membership.CurrentEntries += 1;
            }
            else
            {
                return NotFound();
            }

            // If the CurrentEntries is equal to or greater than MaxEntries
            // or the ExpirationDate is greater than today, set IsExpired to true
            var membershipType = await _context.Memberships
                .Where(m => m.Id == membership.MembershipId)
                .FirstOrDefaultAsync();

            if (membershipType == null)
            {
                return NotFound();
            }

            if (membership.CurrentEntries >= membershipType.MaxEntries || membership.ExpirationDate < DateTime.UtcNow)
            {
                membership.IsExpired = true;
            }

            _context.Update(membership);
            await _context.SaveChangesAsync();

            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };

            return new JsonResult(membership, options);
        }

        [ServiceFilter(typeof(AdminAuthorizationFilter))]
        [HttpDelete("/memberships/delete/{purchasedMembershipId}")]
        public async Task<IActionResult> DeletePurchasedMembership(Guid purchasedMembershipId)
        {
            var membership = await _context.PurchasedMemberships
                .Where(ph => ph.Id == purchasedMembershipId)
                .FirstOrDefaultAsync();

            if (membership == null)
            {
                return NotFound();
            }

            _context.PurchasedMemberships.Remove(membership);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [ServiceFilter(typeof(AdminAuthorizationFilter))]
        [HttpPost("memberships/create")]
        public async Task<IActionResult> CreatePurchasedMembership([FromBody] CreatePurchasedMembershipRequest request)
        {
            var membership = await _context.Memberships
                .Where(m => m.Id == request.MembershipId)
                .FirstOrDefaultAsync();

            if (membership == null)
            {
                return NotFound("Membership not found.");
            }

            var purchasedMembershipId = Guid.NewGuid();
            var barcodeUrl = $"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={purchasedMembershipId}";

            var purchasedMembership = new PurchasedMemberships
            {
                Id = purchasedMembershipId,
                UserId = request.UserId,
                MembershipId = request.MembershipId,
                Barcode = barcodeUrl,
                PurchaseDate = DateTime.UtcNow,
                ExpirationDate = DateTime.UtcNow.AddMonths(1),
                IsExpired = false,
                CurrentEntries = 0
            };

            _context.PurchasedMemberships.Add(purchasedMembership);
            await _context.SaveChangesAsync();

            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };

            return new JsonResult(purchasedMembership, options);
        }

        public class CreatePurchasedMembershipRequest
        {
            public Guid UserId { get; set; }
            public Guid MembershipId { get; set; }
        }
    }
}