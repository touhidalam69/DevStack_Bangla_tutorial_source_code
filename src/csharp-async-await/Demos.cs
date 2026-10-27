using System.Diagnostics;

static class Demos
{
    // an async method runs on the caller's thread until its first await
    public static async Task Order()
    {
        Console.WriteLine("1");
        Task task = PrintAsync();
        Console.WriteLine("3");
        await task;
    }

    static async Task PrintAsync()
    {
        Console.WriteLine("2");
        await Task.Delay(100);
        Console.WriteLine("4");
    }

    // a thousand waits at once: no thread sits inside a Delay
    public static async Task Thousand()
    {
        var clock = Stopwatch.StartNew();
        var waits = Enumerable.Range(0, 1000)
            .Select(_ => Task.Delay(1000));
        await Task.WhenAll(waits);
        Console.WriteLine($"1000 waits: {clock.ElapsedMilliseconds} ms, "
            + $"{ThreadPool.ThreadCount} pool threads");
    }

    // .Result blocks the UI thread; the await inside needs that thread
    public static void Deadlock() => UiThread.Click(() =>
    {
        Console.WriteLine("Click: loading jobs...");
        List<string> jobs = Api.LoadJobsAsync().Result;
        Console.WriteLine($"Loaded {jobs.Count} jobs");
    });

    // fix 1: await all the way; an event handler may be async void
    public static void AwaitAllTheWay() => UiThread.Click(async () =>
    {
        Console.WriteLine("Click: loading jobs...");
        List<string> jobs = await Api.LoadJobsAsync();
        Console.WriteLine($"Loaded {jobs.Count} jobs");
    });

    // fix 2, in library code: ConfigureAwait(false) inside the library
    public static void LibraryFix() => UiThread.Click(() =>
    {
        Console.WriteLine("Click: loading jobs...");
        List<string> jobs = Api.LoadJobsLibraryAsync().Result;
        Console.WriteLine($"Loaded {jobs.Count} jobs");
    });

    // async void: the caller cannot await it or catch its exception
    public static async Task AsyncVoid()
    {
        try { SaveVoid(); }
        catch (Exception e) { Console.WriteLine($"Caught: {e.Message}"); }
        await Task.Delay(500);
        Console.WriteLine("Still running");
    }

    static async void SaveVoid()
    {
        await Task.Delay(100);
        throw new InvalidOperationException("Save failed");
    }

    // async Task: the exception waits in the task until we await it
    public static async Task AsyncTask()
    {
        try { await SaveAsync(); }
        catch (Exception e) { Console.WriteLine($"Caught: {e.Message}"); }
        Console.WriteLine("Still running");
    }

    static async Task SaveAsync()
    {
        await Task.Delay(100);
        throw new InvalidOperationException("Save failed");
    }

    // forgetting await: nobody ever sees the exception
    public static async Task Forget()
    {
        try { SaveAsync(); }
        catch (Exception e) { Console.WriteLine($"Caught: {e.Message}"); }
        await Task.Delay(500);
        Console.WriteLine("Still running");
    }

    // three calls that do not need each other, awaited one by one
    public static async Task OneByOne()
    {
        var clock = Stopwatch.StartNew();
        string profile = await Api.GetAsync("profile");
        string jobs = await Api.GetAsync("jobs");
        string alerts = await Api.GetAsync("alerts");
        Console.WriteLine($"{profile}, {jobs}, {alerts}: "
            + $"{clock.ElapsedMilliseconds} ms");
    }

    // the same three started together, then awaited together
    public static async Task WhenAll()
    {
        var clock = Stopwatch.StartNew();
        Task<string> profile = Api.GetAsync("profile");
        Task<string> jobs = Api.GetAsync("jobs");
        Task<string> alerts = Api.GetAsync("alerts");
        string[] all = await Task.WhenAll(profile, jobs, alerts);
        Console.WriteLine($"{string.Join(", ", all)}: "
            + $"{clock.ElapsedMilliseconds} ms");
    }
}
