public record Saved(int Id, string Company);
public record NotFound(int Id);
public record Invalid(string Field, string Message);
public record Duplicate(string Company);

public union SaveResult(Saved, NotFound, Invalid, Duplicate);
