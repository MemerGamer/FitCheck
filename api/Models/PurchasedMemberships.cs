using System;
using System.Collections.Generic;

namespace api.Models;

public partial class PurchasedMemberships
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public Guid MembershipId { get; set; }

    public string Barcode { get; set; } = null!;

    public int CurrentEntries { get; set; }

    public bool IsExpired { get; set; }

    public DateTime PurchaseDate { get; set; }

    public DateTime ExpirationDate { get; set; }
    public virtual Membership Membership { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
