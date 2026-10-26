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

// one page from GET /api/jobs (Episode 6)
export interface Page<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}
