using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Membership
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;

    public string AccessHour { get; set; }

    public string Description {  get; set; }

    public long MaxEntries { get; set; }

    public double Price { get; set; }

    public virtual ICollection<PurchasedMemberships> PurchasedMemberships { get; set; } = new List<PurchasedMemberships>();
}
