public closed record JobStatus;

public record Applied : JobStatus;
public record Interview(DateOnly On) : JobStatus;
public record Offer(decimal Salary) : JobStatus;
