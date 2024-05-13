using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMemberships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Membership_MembershipType_MembershipTypeId",
                table: "Membership");

            migrationBuilder.DropTable(
                name: "MembershipType");

            migrationBuilder.DropIndex(
                name: "IX_Membership_MembershipTypeId",
                table: "Membership");

            migrationBuilder.DropColumn(
                name: "MembershipTypeId",
                table: "Membership");

            migrationBuilder.RenameColumn(
                name: "IsValid",
                table: "Membership",
                newName: "IsExpired");

            migrationBuilder.AddColumn<string>(
                name: "AccessHour",
                table: "Membership",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Membership",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Membership",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Membership",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccessHour",
                table: "Membership");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Membership");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Membership");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Membership");

            migrationBuilder.RenameColumn(
                name: "IsExpired",
                table: "Membership",
                newName: "IsValid");

            migrationBuilder.AddColumn<Guid>(
                name: "MembershipTypeId",
                table: "Membership",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "MembershipType",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MembershipType", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Membership_MembershipTypeId",
                table: "Membership",
                column: "MembershipTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Membership_MembershipType_MembershipTypeId",
                table: "Membership",
                column: "MembershipTypeId",
                principalTable: "MembershipType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
