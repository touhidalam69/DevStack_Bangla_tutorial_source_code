using System.ComponentModel.DataAnnotations;

namespace JobTrack.Api.Data;

public class JobApplication
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public required string Company { get; set; }

    [Required, MaxLength(100)]
    public required string Role { get; set; }

    [MaxLength(20)]
    [AllowedValues("Applied", "Interview", "Offer", "Rejected",
        ErrorMessage = "Use Applied, Interview, Offer or Rejected.")]
    public required string Status { get; set; }

    public DateOnly? AppliedOn { get; set; }
}
