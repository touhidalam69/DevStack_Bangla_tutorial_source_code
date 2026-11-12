public abstract record SaveResult;

public record Saved(int Id, string Company) : SaveResult;
public record NotFound(int Id) : SaveResult;
public record Invalid(string Field, string Message) : SaveResult;
public record Duplicate(string Company) : SaveResult;
