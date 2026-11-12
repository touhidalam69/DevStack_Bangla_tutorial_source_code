using System.Text.Json;

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

// Inside a union: a struct that holds the case in Value
SaveResult first = results[0];
Console.WriteLine($"Value: {first.Value?.GetType().Name}");
Console.WriteLine($"Struct: {typeof(SaveResult).IsValueType}");
Console.WriteLine(JsonSerializer.Serialize(first));

SaveResult empty = default;
Console.WriteLine(Message(empty));

// Closed hierarchy: only this assembly can derive from JobStatus
JobStatus[] statuses =
    [new Applied(), new Interview(new(2026, 11, 20)), new Offer(85000)];
foreach (var status in statuses)
    Console.WriteLine(Describe(status));

// Collection expression arguments
HashSet<string> companies =
[
    with(StringComparer.OrdinalIgnoreCase),
    "Contoso", "contoso", "CONTOSO",
];
Console.WriteLine($"Companies: {companies.Count}");

// Labeled break: leave both loops at once
string[][] weeks =
    [["Contoso", "Fabrikam"], ["Northwind", "Adatum"], ["Litware"]];
outer: foreach (var week in weeks)
{
    foreach (var company in week)
    {
        Console.WriteLine($"Checking {company}");
        if (company == "Northwind")
            break outer;
    }
}

static string Message(SaveResult result) => result switch
{
    Saved s => $"Saved #{s.Id} {s.Company}",
    NotFound n => $"Job #{n.Id} not found",
    Invalid i => $"{i.Field}: {i.Message}",
    Duplicate d => $"{d.Company} is already in your list",
    null => "Nothing saved yet",
};

static string Describe(JobStatus status) => status switch
{
    Applied => "Applied: waiting for a reply",
    Interview(var on) => $"Interview on {on:MMM d}",
    Offer(var salary) => $"Offer: {salary:N0} BDT",
};
