import { NextResponse, type NextRequest } from "next/server";
import { captureException } from "@sentry/nextjs";

export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

type ApiHandler = (req: NextRequest, ctx: any) => Promise<Response | undefined>;

export function guardApi<H extends ApiHandler>(label: string, handler: H): H {
  const wrapped = async (req: NextRequest, ctx: any) => {
    try {
      return await handler(req, ctx);
    } catch (err) {
      return handleApiCrash(err, label);
    }
  };
  return wrapped as H;
}

export function handleApiCrash(err: unknown, label?: string): NextResponse {
  if (err instanceof ApiError) {
    console.error(`[api] ${label ?? "?"} ${err.status}:`, err.message, err.details ?? "");
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  console.error(`[api] ${label ?? "?"} 500:`, err);
  captureException(err, { tags: { api: label ?? "unknown" } });
  return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
}

export function apiError(status: number, message: string, details?: unknown): NextResponse {
  return NextResponse.json({ error: message, ...(details ? { details } : {}) }, { status });
}