using JobTrack.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobTrack.Api.Controllers;

[ApiController]
[Route("api/jobs")]
public class JobsController(JobTrackDb db) : ControllerBase
{
    [HttpGet]
    public Task<List<JobApplication>> GetAll() =>
        db.Jobs.AsNoTracking().ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<JobApplication>> Get(int id)
    {
        var job = await db.Jobs.AsNoTracking()
            .FirstOrDefaultAsync(j => j.Id == id);
        return job is null ? NotFound() : job;
    }

    [HttpPost]
    public async Task<IActionResult> Create(JobApplication job)
    {
        db.Jobs.Add(job);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = job.Id }, job);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, JobApplication input)
    {
        var job = await db.Jobs.FindAsync(id);
        if (job is null) return NotFound();

        job.Company = input.Company;
        job.Role = input.Role;
        job.Status = input.Status;
        job.AppliedOn = input.AppliedOn;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id) =>
        await db.Jobs.Where(j => j.Id == id).ExecuteDeleteAsync() == 1
            ? NoContent()
            : NotFound();
}
