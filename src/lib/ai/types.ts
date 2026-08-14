export interface AIChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIGenerateOptions {
  messages: AIChatMessage[];
  maxTokens?: number;
  temperature?: number;
  timeoutMs?: number;
}

export interface AICompletion {
  text: string;
  provider: string;
  model: string;
}

export interface AIProvider {
  readonly name: string;
  isAvailable(): boolean;
  generateResponse(options: AIGenerateOptions): Promise<AICompletion>;
}

export interface AIEvent {
  provider: string;
  model: string;
  status: "attempt" | "success" | "failure" | "skipped";
  latencyMs?: number;
  error?: string;
  index?: number;
  total?: number;
}

export interface TutorHistoryItem {
  role: "user" | "assistant";
  content: string;
}

export interface TutorReplyContext {
  message: string;
  history: TutorHistoryItem[];
  studentName: string | null;
  serieName: string | null;
  classLevel: string | null;
  userId?: number | null;
  subjectId?: number | null;
  lessonId?: number | null;
}
