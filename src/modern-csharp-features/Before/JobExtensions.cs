public static class JobExtensions
{
    public static bool IsOpen(this JobApplication job) =>
        job.Status == Status.Applied || job.Status == Status.Interview;

    public static int OpenCount(this IEnumerable<JobApplication> all) =>
        all.Count(j => j.IsOpen());
}
