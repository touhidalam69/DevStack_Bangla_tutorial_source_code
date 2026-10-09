// Q5: a lambda in a for loop. What does it print?
static class Q05
{
    public static void Run()
    {
        var actions = new List<Action>();
        for (int i = 0; i < 3; i++)
        {
            actions.Add(() => Console.Write(i));
        }
        foreach (var act in actions) act();
    }

    public static void Fixed()
    {
        var actions = new List<Action>();
        for (int i = 0; i < 3; i++)
        {
            int copy = i;
            actions.Add(() => Console.Write(copy));
        }
        foreach (var act in actions) act();
    }
}
