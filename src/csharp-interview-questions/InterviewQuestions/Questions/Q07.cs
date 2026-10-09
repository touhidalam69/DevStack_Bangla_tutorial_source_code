// Q7: record vs class equality. What does it print?
record UserR(string Name);
class UserC(string n) { public string Name => n; }

static class Q07
{
    public static void Run()
    {
        Console.WriteLine(new UserR("Ana") == new UserR("Ana"));
        Console.WriteLine(new UserC("Ana") == new UserC("Ana"));
    }
}
