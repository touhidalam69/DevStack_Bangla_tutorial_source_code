public static class JobExtensions
{
    extension(JobApplication job)
    {
        public bool IsOpen =>
            job.Status is Status.Applied or Status.Interview;
    }

    extension(IEnumerable<JobApplication> all)
    {
        public int OpenCount => all.Count(j => j.IsOpen);
    }
}
