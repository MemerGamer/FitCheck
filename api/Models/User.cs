using System;
using System.Collections.Generic;

namespace api.Models;

public partial class User
{
    public Guid Id { get; set; }

    public Guid UserTypeId { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Photo { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime CreationDate { get; set; }

    public virtual ICollection<PurchasedMemberships> PurchasedMemberships { get; set; } = new List<PurchasedMemberships>();

    public virtual UserType UserType { get; set; } = null!;
}
