namespace JobTrack.Api.Data;

// one page of rows, plus what the client needs to draw the pager
public record PagedResult<T>(
    List<T> Items, int Page, int PageSize, int Total);
