using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<UserType> UserTypes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<PurchasedMemberships> PurchasedMemberships { get; set; }
        public DbSet<Membership> Memberships { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DatabaseContext).Assembly);

            // Configure the UserType entity
            modelBuilder.Entity<UserType>(entity =>
            {
                entity.ToTable("UserType");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).IsRequired().HasMaxLength(50);
            });

            // Configure the User entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Email).IsRequired().HasMaxLength(100);

                entity.Property(e => e.Username).IsRequired().HasMaxLength(50);

                entity.Property(e => e.Password).IsRequired().HasMaxLength(100);

                entity.Property(e => e.Photo).HasMaxLength(255);

                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);

                entity.Property(e => e.CreationDate).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.UserType)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.UserTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_UserType");
            });

            // Configure the PurchasedMemberships entity
            modelBuilder.Entity<PurchasedMemberships>(entity =>
            {
                entity.ToTable("PurchasedMemberships");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.CurrentEntries).IsRequired().HasDefaultValue(0);
                entity.Property(e => e.IsExpired).IsRequired().HasDefaultValue(false);
                entity.Property(e => e.PurchaseDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
                // Expiration date is current date + 1 month
                entity.Property(e => e.ExpirationDate).HasDefaultValueSql("CURRENT_TIMESTAMP + INTERVAL '1 month'");
                entity.HasOne(d => d.User)
                    .WithMany(p => p.PurchasedMemberships)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PurchasedMemberships_User");

                entity.HasOne(d => d.Membership)
                    .WithMany(p => p.PurchasedMemberships)
                    .HasForeignKey(d => d.MembershipId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PurchasedMemberships_Membership");
            });

            // Configure the Membership entity
            modelBuilder.Entity<Membership>(entity =>
            {
                entity.ToTable("Membership");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);

                entity.Property(e => e.AccessHour).IsRequired();

                entity.Property(e => e.Description).IsRequired().HasMaxLength(255);

                entity.Property(e => e.MaxEntries).IsRequired();

                entity.Property(e => e.Price).IsRequired().HasDefaultValue(0);
            });
        }
    }
}