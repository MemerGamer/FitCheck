﻿using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Membership
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;

    public string Barcode { get; set; } = null!;

    public string AccessHour { get; set; }

    public string Description {  get; set; }

    public long CurrentEntries { get; set; }

    public long MaxEntries { get; set; }

    public double Price { get; set; }

    public bool IsExpired { get; set; } = false;

    public DateTime ExpirationDate { get; set; }

    public virtual ICollection<PurchaseHistory> PurchaseHistories { get; set; } = new List<PurchaseHistory>();
}
