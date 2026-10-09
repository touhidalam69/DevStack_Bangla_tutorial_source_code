public static class NextStep
{
    public static string For(JobApplication job)
    {
        if (job.Status == Status.Offer)
            return "Reply to offer";
        if (job.Status == Status.Interview)
            return "Prepare";
        if (job.Status == Status.Applied && job.DaysWaiting >= 7)
            return "Follow up";
        if (job.Status == Status.Applied)
            return "Wait";
        return "Archive";
    }
}
