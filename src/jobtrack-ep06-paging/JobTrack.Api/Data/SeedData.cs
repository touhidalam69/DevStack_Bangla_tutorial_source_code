using Microsoft.EntityFrameworkCore;

namespace JobTrack.Api.Data;

public static class SeedData
{
    // Episode 6: enough rows to see more than one page
    public static void AddJobs(DbContext db, bool _)
    {
        var jobs = db.Set<JobApplication>();
        if (jobs.Any()) return;

        jobs.AddRange(
            Job("Contoso", "Junior .NET Developer", "Applied", "2026-09-01"),
            Job("Fabrikam", "Angular Developer", "Interview", "2026-09-02"),
            Job("Northwind", "Full Stack Intern", "Offer", "2026-09-03"),
            Job("Litware", "Backend Developer", "Applied", "2026-09-05"),
            Job("Adatum", "Software Engineer", "Rejected", "2026-09-05"),
            Job("Tailspin", "QA Engineer", "Applied", "2026-09-08"),
            Job("Woodgrove", "C# Developer", "Interview", "2026-09-09"),
            Job("Proseware", "Node.js Developer", "Applied", "2026-09-10"),
            Job("Wingtip", "Frontend Developer", "Rejected", "2026-09-12"),
            Job("Relecloud", "Cloud Engineer", "Applied", "2026-09-12"),
            Job("Fourth Coffee", "Web Developer", "Interview", "2026-09-15"),
            Job("Coho Winery", "Junior Developer", "Applied", "2026-09-16"),
            Job("Trey Research", "Data Engineer", "Offer", "2026-09-18"),
            Job("Alpine Ski House", "Full Stack Developer", "Applied", "2026-09-19"),
            Job("Blue Yonder", "Angular Developer", "Rejected", "2026-09-22"),
            Job("VanArsdel", "Software Engineer", "Applied", "2026-09-23"),
            Job("Lucerne", "DevOps Engineer", "Interview", "2026-09-25"),
            Job("Margie's Travel", "Backend Developer", "Applied", "2026-09-26"),
            Job("Southridge", "API Developer", "Applied", "2026-09-29"),
            Job("Humongous", ".NET Developer", "Interview", "2026-09-30"),
            Job("Wide World", "Frontend Intern", "Applied", "2026-10-02"),
            Job("Graphic Institute", "Web Developer", "Offer", "2026-10-05"));
        db.SaveChanges();
    }

    static JobApplication Job(string company, string role, string status,
        string appliedOn) => new()
    {
        Company = company,
        Role = role,
        Status = status,
        AppliedOn = DateOnly.Parse(appliedOn),
    };
}
