﻿using System;
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
                        MaxEntries = m.MaxEntries
                    }
                )
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

            // Make the CurrentEntries greater by one
            membership.CurrentEntries += 1;

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
    }
}