// Q6: LINQ deferred execution. What does it print?
static class Q06
{
    public static void Run()
    {
        var nums = new List<int> { 1, 2, 3 };
        var big = nums.Where(n => n > 1);
        nums.Add(4);
        Console.WriteLine(big.Count());
    }

    public static void Fixed()
    {
        var nums = new List<int> { 1, 2, 3 };
        var big = nums.Where(n => n > 1).ToList();
        nums.Add(4);
        Console.WriteLine(big.Count);
    }
}
