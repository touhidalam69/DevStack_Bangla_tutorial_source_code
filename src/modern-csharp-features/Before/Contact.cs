public class Contact
{
    private string _email = "";

    public string Email
    {
        get => _email;
        set => _email = value.Trim().ToLowerInvariant();
    }
}
