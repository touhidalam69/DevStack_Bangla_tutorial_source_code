// Confidence from the probabilities, with the formulas published
// at docs.typesafe.ai/confidence. 1 = one clear answer, 0 = even.
public static class Confidence
{
    public static double OfChoice(IEnumerable<double> p)
    {
        var all = p.ToArray();
        double n = all.Length;
        return (all.Max() - 1 / n) / (1 - 1 / n);
    }

    public static double OfScore(IReadOnlyList<double> p)
    {
        int n = p.Count;
        int top = p.ToList().IndexOf(p.Max());
        var spread = p.Select((v, i) => v * Math.Abs(i - top)).Sum();
        var even = Enumerable.Range(0, n)
            .Average(i => Math.Abs(i - (n - 1) / 2.0));
        return Math.Max(0, 1 - spread / even);
    }
}
