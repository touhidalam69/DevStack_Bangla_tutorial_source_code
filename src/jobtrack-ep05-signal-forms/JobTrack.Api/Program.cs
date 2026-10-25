using JobTrack.Api.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();
builder.Services.AddProblemDetails();
builder.Services.AddValidation();
builder.Services.AddCors(options =>
    options.AddPolicy("AngularDev", policy => policy
        .WithOrigins("http://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod()));
builder.Services.AddDbContext<JobTrackDb>(options => options
    .UseSqlServer(builder.Configuration.GetConnectionString("JobTrack"))
    .UseSeeding(SeedData.AddJobs));

var app = builder.Build();
app.UseExceptionHandler();
app.UseStatusCodePages();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}
app.UseHttpsRedirection();
app.UseCors("AngularDev");

var jobs = app.MapGroup("/api/jobs");

jobs.MapGet("/", (JobTrackDb db) =>
    db.Jobs.AsNoTracking().ToListAsync());

jobs.MapGet("/{id:int}", async (int id, JobTrackDb db) =>
    await db.Jobs.AsNoTracking().FirstOrDefaultAsync(j => j.Id == id)
        is JobApplication job ? Results.Ok(job) : Results.NotFound());

// Episode 5: the Angular form asks this while you type
jobs.MapGet("/exists", async (string company, JobTrackDb db) =>
    new { exists = await db.Jobs.AnyAsync(j => j.Company == company) });

jobs.MapPost("/", async Task<Results<Created<JobApplication>,
    ValidationProblem>> (JobApplication job, JobTrackDb db) =>
{
    if (await db.Jobs.AnyAsync(j => j.Company == job.Company))
        return Duplicate(job.Company);

    db.Jobs.Add(job);
    await db.SaveChangesAsync();
    return TypedResults.Created($"/api/jobs/{job.Id}", job);
});

jobs.MapPut("/{id:int}", async (int id, JobApplication input,
    JobTrackDb db) =>
{
    var job = await db.Jobs.FindAsync(id);
    if (job is null) return Results.NotFound();
    if (await db.Jobs.AnyAsync(j =>
            j.Id != id && j.Company == input.Company))
        return Duplicate(input.Company);

    job.Company = input.Company;
    job.Role = input.Role;
    job.Status = input.Status;
    job.AppliedOn = input.AppliedOn;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

jobs.MapDelete("/{id:int}", async (int id, JobTrackDb db) =>
    await db.Jobs.Where(j => j.Id == id).ExecuteDeleteAsync() == 1
        ? Results.NoContent()
        : Results.NotFound());

app.Run();

// One company once: the same 400 shape as the built-in validation
static ValidationProblem Duplicate(string company) =>
    TypedResults.ValidationProblem(new Dictionary<string, string[]>
    {
        ["company"] = [$"You already applied to {company}."],
    });
