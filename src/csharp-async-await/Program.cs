// DevStack Bangla, async await in C#: dotnet run -- <demo>
switch (args.FirstOrDefault())
{
    case "order": await Demos.Order(); break;
    case "thousand": await Demos.Thousand(); break;
    case "deadlock": Demos.Deadlock(); break;
    case "await": Demos.AwaitAllTheWay(); break;
    case "library": Demos.LibraryFix(); break;
    case "async-void": await Demos.AsyncVoid(); break;
    case "async-task": await Demos.AsyncTask(); break;
    case "forget": await Demos.Forget(); break;
    case "one-by-one": await Demos.OneByOne(); break;
    case "when-all": await Demos.WhenAll(); break;
    default:
        Console.WriteLine("Demos: order, thousand, deadlock, await,");
        Console.WriteLine("  library, async-void, async-task, forget,");
        Console.WriteLine("  one-by-one, when-all");
        break;
}
