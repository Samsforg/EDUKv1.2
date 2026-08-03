export type Role = "student" | "teacher" | "admin" | "parent" | "expert";

export interface User {
  id: number;
  role: Role;
  email: string | null;
  phone: string | null;
  first_name: string;
  last_name: string;
  serie_id: number | null;
  class_level: string | null;
  xp: number;
  streak: number;
  referral_code: string | null;
  blocked?: number;
  commune?: string | null;
}

export interface Subject {
  id: number;
  code: string;
  name: string;
  icon: string;
  color: string;
  coefficient_json?: string;
}

export interface Chapter {
  id: number;
  subject_id: number;
  grade_id: number;
  code: string;
  title: string;
  description: string;
  order_index: number;
  position: number;
  officiel_ref: string;
}

export interface Quiz {
  id: number;
  subject_id: number;
  chapter_id: number | null;
  title: string;
  level: string;
  position: number;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer_index: number;
  explanation: string | null;
  points: number;
}

export interface ExamPaper {
  id: number;
  category: "BAC" | "BEPC";
  series_id: number | null;
  subject_id: number;
  year: number;
  title: string;
  duration_minutes: number;
}

export interface QuizAttempt {
  id: number;
  user_id: number;
  quiz_id: number;
  score: number;
  max_score: number;
  completed_at: string;
}

export interface ExamAttempt {
  id: number;
  user_id: number;
  paper_id: number;
  score: number;
  score_over_20: number;
  duration_seconds: number;
  completed_at: string;
}
