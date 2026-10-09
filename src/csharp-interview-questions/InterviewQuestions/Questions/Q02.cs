// Q2: == vs Equals. What does it print?
static class Q02
{
    public static void Run()
    {
        string a = "hello";
        string b = new string("hello".ToCharArray());
        object oa = a;
        object ob = b;

        Console.WriteLine(a == b);
        Console.WriteLine(oa == ob);
        Console.WriteLine(oa.Equals(ob));
    }
}
