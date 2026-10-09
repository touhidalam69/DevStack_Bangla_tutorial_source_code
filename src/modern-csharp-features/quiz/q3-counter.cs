var c = new Counter(5);
c.Next();
Console.WriteLine(c.Next());

class Counter(int start)
{
    public int Next() => ++start;
}
