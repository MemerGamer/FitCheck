using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class DBRefactor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PurchaseHistory");

            migrationBuilder.DropColumn(
                name: "CurrentEntries",
                table: "Membership");

            migrationBuilder.DropColumn(
                name: "ExpirationDate",
                table: "Membership");

            migrationBuilder.DropColumn(
                name: "IsExpired",
                table: "Membership");

            migrationBuilder.AlterColumn<double>(
                name: "Price",
                table: "Membership",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Membership",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Membership",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Barcode",
                table: "Membership",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateTable(
                name: "PurchasedMemberships",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    MembershipId = table.Column<Guid>(type: "uuid", nullable: false),
                    CurrentEntries = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    IsExpired = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    PurchaseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    ExpirationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP + INTERVAL '1 month'")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchasedMemberships", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchasedMemberships_Membership",
                        column: x => x.MembershipId,
                        principalTable: "Membership",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PurchasedMemberships_User",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PurchasedMemberships_MembershipId",
                table: "PurchasedMemberships",
                column: "MembershipId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchasedMemberships_UserId",
                table: "PurchasedMemberships",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PurchasedMemberships");

            migrationBuilder.AlterColumn<double>(
                name: "Price",
                table: "Membership",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision",
                oldDefaultValue: 0.0);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Membership",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Membership",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "Barcode",
                table: "Membership",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<long>(
                name: "CurrentEntries",
                table: "Membership",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpirationDate",
                table: "Membership",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsExpired",
                table: "Membership",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "PurchaseHistory",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MembershipId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    PurchaseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchaseHistory_Membership_MembershipId",
                        column: x => x.MembershipId,
                        principalTable: "Membership",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PurchaseHistory_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseHistory_MembershipId",
                table: "PurchaseHistory",
                column: "MembershipId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseHistory_UserId",
                table: "PurchaseHistory",
                column: "UserId");
        }
    }
}
