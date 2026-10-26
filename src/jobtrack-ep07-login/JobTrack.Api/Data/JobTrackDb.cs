using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace JobTrack.Api.Data;

// Episode 7: IdentityDbContext adds the users and roles tables
public class JobTrackDb(DbContextOptions<JobTrackDb> options)
    : IdentityDbContext<IdentityUser>(options)
{
    public DbSet<JobApplication> Jobs => Set<JobApplication>();
}
