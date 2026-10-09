// Q9: int.MaxValue + 1. What does it print?
static class Q09
{
    public static void Run()
    {
        int max = int.MaxValue;
        int next = max + 1;
        Console.WriteLine(next);
    }

    public static void Fixed()
    {
        int max = int.MaxValue;
        int next = checked(max + 1);
        Console.WriteLine(next);
    }
}
