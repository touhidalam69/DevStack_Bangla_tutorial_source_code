var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
    options.AddPolicy("AngularDev", policy => policy
        .WithOrigins("http://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod()));

var app = builder.Build();
if (app.Environment.IsDevelopment()) app.MapOpenApi();
app.UseHttpsRedirection();
app.UseCors("AngularDev");

JobApplication[] jobs =
[
    new(1, "Contoso", "Junior .NET Developer", "Applied"),
    new(2, "Fabrikam", "Angular Developer", "Interview"),
    new(3, "Northwind", "Full Stack Intern", "Offer"),
];

app.MapGet("/api/jobs", () => jobs);

app.Run();

record JobApplication(
    int Id, string Company, string Role, string Status);
