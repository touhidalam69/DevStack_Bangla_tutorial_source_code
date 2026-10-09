// Q10: null-conditional assignment (C# 14). What does it print?
class Profile { public string Name { get; set; } = ""; }

static class Q10
{
    public static void Run()
    {
        Profile? profile = null;
        profile?.Name = LoadName();
        Console.WriteLine(profile?.Name ?? "no profile");

        static string LoadName()
        {
            Console.Write("loading ");
            return "Ana";
        }
    }
}
