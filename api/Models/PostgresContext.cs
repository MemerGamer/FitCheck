using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace api.Models;

public partial class PostgresContext : DbContext
{
    public PostgresContext()
    {
    }

    public PostgresContext(DbContextOptions<PostgresContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Membership> Memberships { get; set; }

    public virtual DbSet<PurchaseHistory> PurchaseHistories { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserType> UserTypes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Server=localhost;Port=5469;Database=postgres;User Id=postgres;Password=root;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Membership>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("memberships_pkey");

            entity.ToTable("memberships");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Barcode).HasColumnName("barcode");
            entity.Property(e => e.CurrentEntries).HasColumnName("current_entries");
            entity.Property(e => e.ExpirationDate)
                .HasColumnType("timestamp(0) without time zone")
                .HasColumnName("expiration_date");
            entity.Property(e => e.IsExpired).HasColumnName("is_expired");
            entity.Property(e => e.MaxEntries).HasColumnName("max_entries");

        });

        modelBuilder.Entity<PurchaseHistory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("purchase_history_pkey");

            entity.ToTable("purchase_history");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.MembershipId).HasColumnName("membership_id");
            entity.Property(e => e.PurchaseDate)
                .HasColumnType("timestamp(0) without time zone")
                .HasColumnName("purchase_date");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Membership).WithMany(p => p.PurchaseHistories)
                .HasForeignKey(d => d.MembershipId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("purchase_history_membership_id_foreign");

            entity.HasOne(d => d.User).WithMany(p => p.PurchaseHistories)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("purchase_history_user_id_foreign");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_pkey");

            entity.ToTable("users");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CreationDate)
                .HasColumnType("timestamp(0) without time zone")
                .HasColumnName("creation_date");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValue(false)
                .HasColumnName("is_deleted");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Photo)
                .HasMaxLength(255)
                .HasColumnName("photo");
            entity.Property(e => e.UserTypeId).HasColumnName("user_type_id");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("username");

            entity.HasOne(d => d.UserType).WithMany(p => p.Users)
                .HasForeignKey(d => d.UserTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("users_user_type_id_foreign");
        });

        modelBuilder.Entity<UserType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("user_types_pkey");

            entity.ToTable("user_types");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
