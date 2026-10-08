using Microsoft.EntityFrameworkCore;

namespace JobTrack.Api.Data;

public class JobTrackDb(DbContextOptions<JobTrackDb> options)
    : DbContext(options)
{
    public DbSet<JobApplication> Jobs => Set<JobApplication>();
}
