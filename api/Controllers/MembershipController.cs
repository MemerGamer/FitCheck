﻿using System;
using System.Collections.Generic;
using System.Linq;
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
                        Id = m.Id,
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

        [HttpGet("user/{userUuid}/memberships/{membershipId}")]
        public async Task<IActionResult> GetMembershipForUser(Guid userUuid, Guid membershipId)
        {
            var membership = await _context.PurchasedMemberships
                .Where(ph => ph.UserId == userUuid && ph.MembershipId == membershipId)
                .Join(
                    _context.Memberships,
                    ph => ph.MembershipId,
                    m => m.Id,
                    (ph, m) => new
                    {
                        Id = m.Id,
                        Name = m.Name,
                        Barcode = ph.Barcode,
                        CurrentEntries = ph.CurrentEntries,
                        MaxEntries = m.MaxEntries,
                        AccessHour = m.AccessHour,
                        Description = m.Description,
                        Price = m.Price,
                        IsExpired = ph.IsExpired,
                        ExpirationDate = ph.ExpirationDate,
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


        [ServiceFilter(typeof(AdminAuthorizationFilter))]
        [HttpGet("memberships")]
        public async Task<IActionResult> GetAllMemberships()
        {
            var memberships = await _context.Memberships.ToListAsync();
            return Ok(memberships);
        }
    }
}