using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

var builder = Host.CreateApplicationBuilder(args);

// stdout carries the MCP messages, so every log goes to stderr.
builder.Logging.AddConsole(o =>
    o.LogToStandardErrorThreshold = LogLevel.Trace);

builder.Services.AddSingleton<JobStore>();

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<JobTools>();

await builder.Build().RunAsync();
