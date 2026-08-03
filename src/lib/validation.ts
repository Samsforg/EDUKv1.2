import { z } from "zod";

// ===== AUTH =====
export const LoginSchema = z.object({
  identifier: z.string().min(3).max(100),
  password: z.string().min(4).max(128),
});

export const RegisterSchema = z.object({
  first_name: z.string().min(1).max(50),
  last_name: z.string().min(1).max(50),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(8).max(20).optional().or(z.literal("")),
  password: z.string().min(6).max(128),
  referral_code: z.string().optional(),
}).refine((d) => d.email || d.phone, { message: "Email ou téléphone requis" });

// ===== QUIZ =====
export const QuizSubmitSchema = z.object({
  quiz_id: z.number().int().positive(),
  answers: z.array(z.number().int().min(0).max(3)).min(1),
  duration_seconds: z.number().int().min(0).max(7200).optional(),
});

export const QuizCreateSchema = z.object({
  subject_id: z.number().int().positive(),
  chapter_id: z.number().int().positive().nullable().optional(),
  title: z.string().min(1).max(200),
  level: z.string().max(50).optional(),
  questions: z.array(z.object({
    question: z.string().min(1),
    options: z.array(z.string().min(1)).min(2).max(6),
    answer_index: z.number().int().min(0),
    explanation: z.string().optional(),
    points: z.number().int().min(1).max(10).optional(),
  })).min(1).max(50),
});

// ===== FORUM =====
export const ForumPostSchema = z.object({
  title: z.string().min(3).max(200),
  body: z.string().min(10).max(5000),
  category_id: z.number().int().positive().nullable().optional(),
});

export const ForumReplySchema = z.object({
  body: z.string().min(2).max(3000),
});

// ===== LIVE =====
export const LiveCreateSchema = z.object({
  title: z.string().min(3).max(200),
  subject: z.string().max(100).optional(),
  scheduled_at: z.string().optional(),
  capacity: z.number().int().min(1).max(10000).optional(),
});

export const LiveMessageSchema = z.object({
  content: z.string().min(1).max(1000),
});

export const LiveQuestionSchema = z.object({
  content: z.string().min(5).max(2000),
});

// ===== COURS =====
export const LessonCompleteSchema = z.object({
  lesson_id: z.number().int().positive(),
  score: z.number().int().min(0).max(100).optional(),
  time_spent_min: z.number().int().min(0).max(480).optional(),
});

// ===== PROF =====
export const ProfLiveStatusSchema = z.object({
  status: z.enum(["live", "paused", "ended"]),
});

export const ProfChatPauseSchema = z.object({
  chat_paused: z.boolean(),
});

export const ProfAnnouncementSchema = z.object({
  content: z.string().min(1).max(2000),
});

export const ProfBlockUserSchema = z.object({
  user_id: z.number().int().positive(),
  reason: z.string().max(500).optional(),
});

export const ProfPinQuestionSchema = z.object({
  question_id: z.number().int().positive(),
  pinned: z.boolean(),
});

// ===== GENERIC HELPERS =====
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): { ok: true; data: T } | { ok: false; errors: string[] } {
  const result = schema.safeParse(data);
  if (result.success) return { ok: true, data: result.data };
  return { ok: false, errors: result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`) };
}