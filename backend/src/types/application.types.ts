export type Status =
  | "Applied"
  | "Phone Screen"
  | "Interview"
  | "Offer"
  | "Rejected";

export interface IApplication {
  company: string;
  role: string;
  description: string;
  skills: string[];
  notes?: string;
  status: Status;
  dateApplied: Date;
  userId: string;
}