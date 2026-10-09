var job = new Job(Status.Applied, Days: 10);
var next = job switch
{
  { Status: Status.Applied } => "Wait",
  { Status: Status.Applied, Days: >= 7 } => "Follow up",
  _ => "Archive",
};
Console.WriteLine(next);

enum Status { Applied, Interview, Offer, Rejected }
record Job(Status Status, int Days);
