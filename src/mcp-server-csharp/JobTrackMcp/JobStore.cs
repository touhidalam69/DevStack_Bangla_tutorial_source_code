using static JobStatus;

// In memory for this demo: in your app, use your database or API.
public sealed class JobStore
{
    private readonly List<JobApplication> _jobs =
    [
        new(1, "Contoso", "Backend Developer", Applied, On(9, 27)),
        new(2, "Fabrikam", ".NET Developer", Interview, On(9, 30)),
        new(3, "Northwind", "Angular Developer", Applied, On(10, 6)),
        new(4, "Litware", "Full Stack Developer", Rejected, On(9, 22)),
    ];

    public List<JobApplication> All()
    {
        lock (_jobs) return [.. _jobs];
    }

    public JobApplication? SetStatus(int id, JobStatus status)
    {
        lock (_jobs)
        {
            var i = _jobs.FindIndex(j => j.Id == id);
            if (i < 0) return null;
            _jobs[i] = _jobs[i] with { Status = status };
            return _jobs[i];
        }
    }

    private static DateOnly On(int m, int d) => new(2026, m, d);
}
