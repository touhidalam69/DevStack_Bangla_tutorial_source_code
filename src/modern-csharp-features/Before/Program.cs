var jobs = new List<JobApplication>
{
    new JobApplication("Contoso", "Junior Dev", Status.Applied, 10),
    new JobApplication("Fabrikam", "Angular Dev", Status.Applied, 3),
    new JobApplication("Northwind", "Intern", Status.Interview, 5),
    new JobApplication("Tailspin", "Full Stack Dev", Status.Offer, 1),
    new JobApplication("Litware", "QA Engineer", Status.Rejected, 20),
};

Console.WriteLine("== Records ==");
var first = jobs[0];
var same = new JobApplication("Contoso", "Junior Dev",
    Status.Applied, 10);
Console.WriteLine(first);
Console.WriteLine($"Equal: {first == same}");
var moved = new JobApplication(first.Company, first.Role,
    Status.Interview, first.DaysWaiting);
Console.WriteLine($"Moved: {moved.Status}, original: {first.Status}");

Console.WriteLine("== Next step ==");
foreach (var job in jobs)
    Console.WriteLine($"{job.Company,-10} {NextStep.For(job)}");

Console.WriteLine("== Follow-ups ==");
var service = new FollowUpService(jobs, 7);
Console.WriteLine($"Due: {string.Join(", ", service.Due())}");

Console.WriteLine("== Extras ==");
var contact = new Contact();
contact.Email = "  HR@Contoso.com ";
Console.WriteLine($"Email: {contact.Email}");
Console.WriteLine($"Open: {jobs.OpenCount()}");
