// A stand-in for api.typesafe.ai, for running without an API key.
// No model runs here: it answers with the sample responses that
// TypeSafe published in its docs (see samples/*.json).
using System.Text.Json;

var samples = Directory.GetFiles("samples", "*.json")
    .Select(f => JsonDocument.Parse(File.ReadAllText(f)).RootElement)
    .ToDictionary(
        s => s.GetProperty("state").GetString()!,
        s => s.GetProperty("response"));

var app = WebApplication.Create(args);

app.MapPost("/v1/systemone", (JsonElement request) =>
{
    var state = request.GetProperty("state").GetString() ?? "";
    return samples.TryGetValue(state, out var response)
        ? Results.Json(response)
        : Results.NotFound(new { error = "no published sample" });
});

app.Run("http://localhost:5199");
