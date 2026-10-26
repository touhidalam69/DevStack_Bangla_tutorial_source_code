using System.ComponentModel.DataAnnotations;
using JobTrack.Api.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
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

// Episode 7: users, a cookie login, and an Admin role
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<JobTrackDb>();
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("Admin", policy => policy.RequireRole("Admin"));

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

var auth = app.MapGroup("/api/auth");
auth.MapIdentityApi<IdentityUser>();
auth.MapPost("/logout", async (SignInManager<IdentityUser> signIn) =>
{
    await signIn.SignOutAsync();
    return Results.NoContent();
}).RequireAuthorization();

// every jobs endpoint needs a signed-in user
var jobs = app.MapGroup("/api/jobs").RequireAuthorization();

// Episode 6: one page at a time, sorted and filtered on the server
jobs.MapGet("/", async (JobTrackDb db,
    [Range(1, int.MaxValue)] int page = 1,
    [Range(1, 50)] int pageSize = 5,
    [AllowedValues("company", "status", "appliedOn",
        ErrorMessage = "Use company, status or appliedOn.")]
    string sort = "appliedOn",
    bool desc = false,
    string? status = null) =>
{
    var query = db.Jobs.AsNoTracking();
    if (status is not null)
        query = query.Where(j => j.Status == status);
    var total = await query.CountAsync();

    var sorted = (sort, desc) switch
    {
        ("company", false) => query.OrderBy(j => j.Company),
        ("company", true) => query.OrderByDescending(j => j.Company),
        ("status", false) => query.OrderBy(j => j.Status),
        ("status", true) => query.OrderByDescending(j => j.Status),
        (_, false) => query.OrderBy(j => j.AppliedOn),
        (_, true) => query.OrderByDescending(j => j.AppliedOn),
    };
    var items = await sorted
        .ThenBy(j => j.Id)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    return new PagedResult<JobApplication>(
        items, page, pageSize, total);
});

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

// only an Admin may delete
jobs.MapDelete("/{id:int}", async (int id, JobTrackDb db) =>
    await db.Jobs.Where(j => j.Id == id).ExecuteDeleteAsync() == 1
        ? Results.NoContent()
        : Results.NotFound())
    .RequireAuthorization("Admin");

if (app.Environment.IsDevelopment())
    await SeedData.AddAdminAsync(app.Services,
        app.Configuration["Seed:AdminPassword"]);

app.Run();

// One company once: the same 400 shape as the built-in validation
static ValidationProblem Duplicate(string company) =>
    TypedResults.ValidationProblem(new Dictionary<string, string[]>
    {
        ["company"] = [$"You already applied to {company}."],
    });
