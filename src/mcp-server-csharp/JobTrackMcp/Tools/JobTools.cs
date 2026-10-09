using System.ComponentModel;
using ModelContextProtocol;
using ModelContextProtocol.Server;

public sealed class JobTools(JobStore store)
{
    [McpServerTool]
    [Description("Lists all my job applications.")]
    public List<JobApplication> ListApplications() => store.All();

    [McpServerTool]
    [Description("Changes the status of one job application.")]
    public JobApplication UpdateStatus(
        [Description("Id from list_applications")] int id,
        [Description("The new status")] JobStatus status)
        => store.SetStatus(id, status)
            ?? throw new McpException($"No application with id {id}.");
}
