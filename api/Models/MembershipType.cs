using System;
using System.Collections.Generic;

namespace api.Models;

public partial class MembershipType
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public long Price { get; set; }

    public virtual ICollection<Membership> Memberships { get; set; } = new List<Membership>();
}
