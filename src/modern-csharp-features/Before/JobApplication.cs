public class JobApplication
{
    public string Company { get; }
    public string Role { get; }
    public Status Status { get; }
    public int DaysWaiting { get; }

    public JobApplication(string company, string role,
        Status status, int daysWaiting)
    {
        Company = company;
        Role = role;
        Status = status;
        DaysWaiting = daysWaiting;
    }

    public override bool Equals(object? obj) =>
        obj is JobApplication other &&
        Company == other.Company && Role == other.Role &&
        Status == other.Status && DaysWaiting == other.DaysWaiting;

    public override int GetHashCode() =>
        HashCode.Combine(Company, Role, Status, DaysWaiting);

    public static bool operator ==(JobApplication? a,
        JobApplication? b) => Equals(a, b);

    public static bool operator !=(JobApplication? a,
        JobApplication? b) => !Equals(a, b);

    public override string ToString() =>
        $"JobApplication {{ Company = {Company}, Role = {Role}, " +
        $"Status = {Status}, DaysWaiting = {DaysWaiting} }}";
}
