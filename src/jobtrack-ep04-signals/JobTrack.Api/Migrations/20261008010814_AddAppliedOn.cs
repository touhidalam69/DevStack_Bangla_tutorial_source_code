using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobTrack.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddAppliedOn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "AppliedOn",
                table: "Jobs",
                type: "date",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppliedOn",
                table: "Jobs");
        }
    }
}
