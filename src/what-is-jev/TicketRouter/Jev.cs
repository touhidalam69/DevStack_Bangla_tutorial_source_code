using System.Net.Http.Json;
using System.Text.Json;

// The answer types Jev returns: no text, only typed values.
public record JevResponse(
    string Model,
    Dictionary<string, JevAnswer> Answers,
    JevUsage Usage);

public record JevAnswer(
    string Type,
    string? Choice,
    double? Score,
    double? Noul,
    double? Confidence,
    Dictionary<string, double>? Probabilities,
    Dictionary<string, string>? Legend);

public record JevUsage(int InputTokens, int OutputTokens);

// The three question types.
public static class Q
{
    public static object Choice(
        string instructions, Dictionary<string, string> options) =>
        new { type = "choice", instructions, criteria = options };

    public static object Score(
        string instructions, params string[] levels) =>
        new { type = "score", instructions, criteria = levels };

    public static object Noul(string instructions) =>
        new { type = "noul", instructions };
}

public class JevClient(HttpClient http)
{
    static readonly JsonSerializerOptions Json =
        new(JsonSerializerDefaults.Web)
        {
            PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
        };

    public async Task<JevResponse> AskAsync(
        string state, Dictionary<string, object> questions)
    {
        var body = new { state, model = "jev-latest", questions };
        var res = await http.PostAsJsonAsync(
            "v1/systemone", body, Json);
        res.EnsureSuccessStatusCode();
        return (await res.Content
            .ReadFromJsonAsync<JevResponse>(Json))!;
    }
}
