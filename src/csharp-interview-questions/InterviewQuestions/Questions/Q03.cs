// Q3: boxing. What does it print?
static class Q03
{
    public static void Run()
    {
        int x = 5;
        object boxed = x;
        x = 10;
        Console.WriteLine(boxed);
    }
}
