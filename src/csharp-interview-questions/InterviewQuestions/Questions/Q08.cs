// Q8: return inside try, with finally. What does it print?
static class Q08
{
    public static void Run()
    {
        Console.WriteLine(GetValue());

        static int GetValue()
        {
            try { return 1; }
            finally { Console.Write("finally "); }
        }
    }
}
