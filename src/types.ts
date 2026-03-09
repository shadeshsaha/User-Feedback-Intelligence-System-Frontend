/* eslint-disable @typescript-eslint/no-explicit-any */
export type Category =
  | "Bug"
  | "Feature Request"
  | "UI/UX"
  | "Performance"
  | "General";
export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type Sentiment = "Positive" | "Neutral" | "Negative";
export type AssignedTeam =
  | "Frontend Team"
  | "Backend Team"
  | "Design Team"
  | "DevOps Team"
  | "QA Team"
  | "General";

export interface Feedback {
  _id: string;
  userName: string;
  originalText: string;
  category: Category;
  priority: Priority;
  sentiment: Sentiment;
  assignedTeam: AssignedTeam;
  aiFailover: boolean;
  createdAt: string;
}

export interface FeedbackInput {
  userName: string;
  content: string;
}

export interface Filters {
  search: string;
  category: Category | "All";
  priority: Priority | "All";
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
}
