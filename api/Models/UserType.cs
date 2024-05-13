using System;
using System.Collections.Generic;

namespace api.Models;

public partial class UserType
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
