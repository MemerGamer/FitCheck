using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Membership
{
    public Guid Id { get; set; }

    public Guid MembershipTypeId { get; set; }

    public string Barcode { get; set; } = null!;

    public long CurrentEntries { get; set; }

    public long MaxEntries { get; set; }

    public bool IsValid { get; set; }

    public DateTime ExpirationDate { get; set; }

    public virtual MembershipType MembershipType { get; set; } = null!;

    public virtual ICollection<PurchaseHistory> PurchaseHistories { get; set; } = new List<PurchaseHistory>();
}
