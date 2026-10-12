var baseUrl = Environment.GetEnvironmentVariable("TYPESAFE_BASE_URL")
    ?? "https://api.typesafe.ai";
var key = Environment.GetEnvironmentVariable("TYPESAFE_API_KEY")
    ?? throw new InvalidOperationException("Set TYPESAFE_API_KEY");

using var http = new HttpClient
{
    BaseAddress = new Uri(baseUrl.TrimEnd('/') + "/")
};
http.DefaultRequestHeaders.Authorization = new("Bearer", key);
var jev = new JevClient(http);

if (args.FirstOrDefault() == "bug") await Bug();
else await Ticket();

async Task Ticket()
{
    var ticket = "Hi, I've been trying to connect my Stripe account "
        + "for 3 days and the integration keeps failing. "
        + "I'm losing sales. Please help ASAP.";

    var r = await jev.AskAsync(ticket, new()
    {
        ["department"] = Q.Choice("Which team should handle this",
            new()
            {
                ["billing"] = "Payment or subscription issues",
                ["technical"] = "Bugs or integration problems",
                ["sales"] = "Pricing or account questions",
            }),
        ["frustration"] = Q.Score(
            "How frustrated the customer appears",
            "Calm, just stating facts",
            "Frustrated but civil",
            "Very angry, strong language"),
        ["is_urgent"] = Q.Noul(
            "The message conveys urgency or time-sensitivity"),
    });

    var dept = r.Answers["department"];
    var mood = r.Answers["frustration"];
    var urgent = r.Answers["is_urgent"].Noul >= 0.8;
    var check = Confidence.OfChoice(dept.Probabilities!.Values);

    Console.WriteLine($"model: {r.Model}, "
        + $"{r.Usage.InputTokens} input tokens");
    Console.WriteLine($"department: {dept.Choice} "
        + $"(confidence {dept.Confidence:F2}, check {check:F3})");
    Console.WriteLine($"frustration: {mood.Score:F2} "
        + $"= {mood.Legend![$"{mood.Score:F0}"]}");
    Console.WriteLine($"is_urgent: {r.Answers["is_urgent"].Noul:F2}");
    var route = Route(dept.Choice!, dept.Confidence!.Value);
    Console.WriteLine($"route: {route}" + (urgent ? ", urgent" : ""));
}

async Task Bug()
{
    var report = "The export button crashes the settings page in "
        + "Safari. It works in Chrome, but a few of our "
        + "customers only use Safari.";

    var r = await jev.AskAsync(report, new()
    {
        ["bug_severity"] = Q.Score(
            "How severe is the reported issue?",
            "Cosmetic; no impact to functionality",
            "Broken or degraded feature, but workaround exists",
            "Blocking issue; no workaround exists"),
    });

    var sev = r.Answers["bug_severity"];
    var p = sev.Probabilities!.OrderBy(kv => int.Parse(kv.Key))
        .Select(kv => kv.Value).ToList();

    Console.WriteLine($"bug_severity: {sev.Score:F2} "
        + $"(confidence {sev.Confidence:F2}, "
        + $"check {Confidence.OfScore(p):F3})");
    Console.WriteLine("probabilities: " + string.Join(", ", p));
    var route = Route($"level {sev.Score:F0}", sev.Confidence!.Value);
    Console.WriteLine($"route: {route}");
}

// Our thresholds, not Jev's: act alone only when it is sure.
static string Route(string answer, double confidence) =>
    confidence switch
    {
        >= 0.75 => $"auto -> {answer}",
        >= 0.5 => $"suggest {answer}, a person confirms",
        _ => "human review",
    };
