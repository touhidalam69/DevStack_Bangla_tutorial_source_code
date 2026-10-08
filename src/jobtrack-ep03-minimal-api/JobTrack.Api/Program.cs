using JobTrack.Api.Data;
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

jobs.MapGet("/{id}", async (int id, JobTrackDb db) =>
    await db.Jobs.AsNoTracking().FirstOrDefaultAsync(j => j.Id == id)
        is JobApplication job ? Results.Ok(job) : Results.NotFound());

jobs.MapPost("/", async (JobApplication job, JobTrackDb db) =>
{
    db.Jobs.Add(job);
    await db.SaveChangesAsync();
    return TypedResults.Created($"/api/jobs/{job.Id}", job);
}).ProducesValidationProblem();

jobs.MapPut("/{id}", async (int id, JobApplication input, JobTrackDb db) =>
{
    var job = await db.Jobs.FindAsync(id);
    if (job is null) return Results.NotFound();

    job.Company = input.Company;
    job.Role = input.Role;
    job.Status = input.Status;
    job.AppliedOn = input.AppliedOn;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

jobs.MapDelete("/{id}", async (int id, JobTrackDb db) =>
    await db.Jobs.Where(j => j.Id == id).ExecuteDeleteAsync() == 1
        ? Results.NoContent()
        : Results.NotFound());

app.Run();
