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
        }
    }
}