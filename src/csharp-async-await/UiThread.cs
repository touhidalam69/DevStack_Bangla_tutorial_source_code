using System.Collections.Concurrent;
using System.Diagnostics;

// A stand-in for a WinForms or WPF UI thread: one thread runs every
// callback from a queue, one at a time, and await comes back to it.
sealed class UiThread : SynchronizationContext
{
    readonly BlockingCollection<Action> queue = new();
    int running; // the handler, plus async work it started

    public override void Post(SendOrPostCallback d, object? state) =>
        queue.Add(() => d(state));
    public override void OperationStarted() =>
        Interlocked.Increment(ref running);
    public override void OperationCompleted() =>
        Interlocked.Decrement(ref running);

    // runs a click handler on the UI thread, waits up to 3 s for it
    public static void Click(Action handler)
    {
        var ui = new UiThread();
        var thread = new Thread(() =>
        {
            SetSynchronizationContext(ui);
            foreach (var work in ui.queue.GetConsumingEnumerable())
                work();
        }) { IsBackground = true };
        thread.Start();

        ui.OperationStarted();
        ui.queue.Add(() => { handler(); ui.OperationCompleted(); });
        var clock = Stopwatch.StartNew();
        while (Volatile.Read(ref ui.running) > 0)
        {
            if (clock.Elapsed > TimeSpan.FromSeconds(3))
            {
                Console.WriteLine(
                    "Still waiting after 3 s: the UI thread is stuck");
                return;
            }
            Thread.Sleep(50);
        }
    }
}
