public record Job(int Id, string Company);

public class JobService
{
    private readonly List<Job> jobs =
        [new(1, "Contoso"), new(2, "Fabrikam"), new(3, "Northwind")];

    public SaveResult Save(int? id, string company)
    {
        if (string.IsNullOrWhiteSpace(company))
            return new Invalid("Company", "Company is required");

        var taken = jobs.Any(j => j.Id != id && string.Equals(
            j.Company, company, StringComparison.OrdinalIgnoreCase));
        if (taken)
            return new Duplicate(company);

        if (id is int existing)
        {
            var index = jobs.FindIndex(j => j.Id == existing);
            if (index < 0)
                return new NotFound(existing);
            jobs[index] = new Job(existing, company);
            return new Saved(existing, company);
        }

        var next = jobs.Max(j => j.Id) + 1;
        jobs.Add(new Job(next, company));
        return new Saved(next, company);
    }
}
