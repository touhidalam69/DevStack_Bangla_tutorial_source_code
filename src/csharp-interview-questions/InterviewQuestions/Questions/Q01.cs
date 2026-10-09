// Q1: struct vs class. What does it print?
struct PointS { public int X; }
class PointC { public int X; }

static class Q01
{
    public static void Run()
    {
        var s1 = new PointS();
        var s2 = s1;
        s2.X = 5;

        var c1 = new PointC();
        var c2 = c1;
        c2.X = 5;

        Console.WriteLine($"{s1.X} {c1.X}");
    }
}
