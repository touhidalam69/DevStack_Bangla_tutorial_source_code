using Microsoft.EntityFrameworkCore;

namespace JobTrack.Api.Data;

public static class SeedData
{
    public static void AddJobs(DbContext db, bool _)
    {
        var jobs = db.Set<JobApplication>();
        if (jobs.Any()) return;

        jobs.AddRange(
            Job("Contoso", "Junior .NET Developer", "Applied"),
            Job("Fabrikam", "Angular Developer", "Interview"),
            Job("Northwind", "Full Stack Intern", "Offer"));
        db.SaveChanges();
    }

    static JobApplication Job(string company, string role, string status)
        => new() { Company = company, Role = role, Status = status };
}
