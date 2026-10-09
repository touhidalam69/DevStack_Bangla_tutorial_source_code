public enum JobStatus { Applied, Interview, Offer, Rejected }

public record JobApplication(int Id, string Company, string Role,
    JobStatus Status, DateOnly AppliedOn);
