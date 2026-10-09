public class FollowUpService(List<JobApplication> jobs, int days)
{
    public IEnumerable<string> Due() =>
        jobs.Where(j => j is { Status: Status.Applied })
            .Where(j => j.DaysWaiting >= days)
            .Select(j => j.Company);
}
