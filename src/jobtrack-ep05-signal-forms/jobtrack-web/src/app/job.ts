export interface Job {
  id: number;
  company: string;
  role: string;
  status: string;
  appliedOn: string | null;
}

// what the form edits: a date input needs a string
export interface JobInput {
  company: string;
  role: string;
  status: string;
  appliedOn: string;
}
