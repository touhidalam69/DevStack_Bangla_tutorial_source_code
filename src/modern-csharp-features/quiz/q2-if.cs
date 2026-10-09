var job = new Job(Status.Applied, Days: 10);
if (job.Status == Status.Applied)
    Console.WriteLine("Wait");
else if (job.Status == Status.Applied && job.Days >= 7)
    Console.WriteLine("Follow up");
else
    Console.WriteLine("Archive");

enum Status { Applied, Interview, Offer, Rejected }
record Job(Status Status, int Days);
