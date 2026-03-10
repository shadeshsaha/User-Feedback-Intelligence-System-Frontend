import axios from "axios";
import type { ApiResponse, Feedback, FeedbackInput } from "../types";

const api = axios.create({
  baseURL: "https://nexus-ai-backend-chi.vercel.app/api",
  // baseURL: "http://localhost:5000/api",
});

export const getAllFeedback = async (): Promise<Feedback[]> => {
  const { data } = await api.get<ApiResponse<Feedback[]>>("/getFeedbacks");
  return data.data;
};

export const submitFeedback = async (
  input: FeedbackInput,
): Promise<Feedback> => {
  const { data } = await api.post<ApiResponse<Feedback>>(
    "/createFeedback",
    input,
  );
  return data.data;
};

export const deleteFeedback = async (id: string): Promise<void> => {
  await api.delete(`/deleteFeedback/${id}`);
};
