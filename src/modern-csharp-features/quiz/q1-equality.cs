var a = new JobPost("Junior Dev", ["C#", "SQL"]);
var b = new JobPost("Junior Dev", ["C#", "SQL"]);
Console.WriteLine(a == b);

record JobPost(string Title, List<string> Skills);
