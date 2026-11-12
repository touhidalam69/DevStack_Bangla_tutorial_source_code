using System.Diagnostics;

await LoadJobsAsync();

static async Task LoadJobsAsync() => await ReadFromDbAsync();

static async Task ReadFromDbAsync() => await LogAsync();

static async Task LogAsync()
{
    Console.WriteLine(new StackTrace());
}
