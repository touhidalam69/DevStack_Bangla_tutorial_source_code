var a = new JobPost("Junior Dev", ["C#", "SQL"]);
var b = new JobPost("Junior Dev", ["C#", "SQL"]);
Console.WriteLine(a.Skills == b.Skills);
Console.WriteLine(a.Skills.SequenceEqual(b.Skills));

record JobPost(string Title, List<string> Skills);
