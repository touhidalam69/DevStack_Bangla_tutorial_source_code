// Q4: a list passed to a method. What does it print?
static class Q04
{
    public static void Run()
    {
        var list = new List<int> { 1 };
        AddTwo(list);
        Replace(list);
        Console.WriteLine(string.Join(",", list));

        static void AddTwo(List<int> l) => l.Add(2);
        static void Replace(List<int> l) => l = new() { 9 };
    }
}
