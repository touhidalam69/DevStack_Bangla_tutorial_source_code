using System.ComponentModel.DataAnnotations;

namespace JobTrack.Api.Data;

public class JobApplication
{
    public int Id { get; set; }

    [MaxLength(100)]
    public required string Company { get; set; }

    [MaxLength(100)]
    public required string Role { get; set; }

    [MaxLength(20)]
    public required string Status { get; set; }

    public DateOnly? AppliedOn { get; set; }
}
