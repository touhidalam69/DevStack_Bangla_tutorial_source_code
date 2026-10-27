// Stands in for calls to a web API: each takes a while, then answers.
static class Api
{
    public static async Task<List<string>> LoadJobsAsync()
    {
        await Task.Delay(500);
        return ["Contoso", "Fabrikam", "Northwind"];
    }

    // library code: nothing after the await needs the caller's thread
    public static async Task<List<string>> LoadJobsLibraryAsync()
    {
        await Task.Delay(500).ConfigureAwait(false);
        return ["Contoso", "Fabrikam", "Northwind"];
    }

    public static async Task<string> GetAsync(string what)
    {
        await Task.Delay(1000);
        return what;
    }
}
