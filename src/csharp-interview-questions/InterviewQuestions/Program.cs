// Runs one interview question: dotnet run -- 6
var questions = new Dictionary<string, Action>
{
    ["1"] = Q01.Run,
    ["2"] = Q02.Run,
    ["3"] = Q03.Run,
    ["4"] = Q04.Run,
    ["5"] = Q05.Run,
    ["5-fix"] = Q05.Fixed,
    ["6"] = Q06.Run,
    ["6-fix"] = Q06.Fixed,
    ["7"] = Q07.Run,
    ["8"] = Q08.Run,
    ["9"] = Q09.Run,
    ["9-fix"] = Q09.Fixed,
    ["10"] = Q10.Run,
};

if (args.Length == 0 || !questions.TryGetValue(args[0], out var run))
{
    Console.WriteLine("Usage: dotnet run -- <question>");
    Console.WriteLine($"Questions: {string.Join(", ", questions.Keys)}");
    return;
}

run();
