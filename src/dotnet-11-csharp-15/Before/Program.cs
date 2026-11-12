var service = new JobService();

SaveResult[] results =
[
    service.Save(null, "Adatum"),
    service.Save(42, "Litware"),
    service.Save(null, ""),
    service.Save(null, "contoso"),
];

foreach (var result in results)
    Console.WriteLine(Message(result));

static string Message(SaveResult result) => result switch
{
    Saved s => $"Saved #{s.Id} {s.Company}",
    NotFound n => $"Job #{n.Id} not found",
    Invalid i => $"{i.Field}: {i.Message}",
    _ => "Something went wrong",
};
