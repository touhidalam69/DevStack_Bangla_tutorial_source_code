public static class NextStep
{
    public static string For(JobApplication job) => job switch
    {
        { Status: Status.Offer } => "Reply to offer",
        { Status: Status.Interview } => "Prepare",
        { Status: Status.Applied, DaysWaiting: >= 7 } => "Follow up",
        { Status: Status.Applied } => "Wait",
        _ => "Archive",
    };
}
