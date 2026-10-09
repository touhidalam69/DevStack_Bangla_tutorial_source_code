public class Contact
{
    public string Email
    {
        get;
        set => field = value.Trim().ToLowerInvariant();
    } = "";
}
