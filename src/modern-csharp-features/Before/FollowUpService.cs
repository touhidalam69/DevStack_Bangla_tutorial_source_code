public class FollowUpService
{
    private readonly List<JobApplication> _jobs;
    private readonly int _days;

    public FollowUpService(List<JobApplication> jobs, int days)
    {
        _jobs = jobs;
        _days = days;
    }

    public IEnumerable<string> Due() =>
        _jobs.Where(j => j.Status == Status.Applied)
             .Where(j => j.DaysWaiting >= _days)
             .Select(j => j.Company);
}
