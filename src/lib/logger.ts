type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  [key: string]: unknown;
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  service: string;
}

interface Logger {
  debug: (message: string, context?: LogContext) => void;
  info: (message: string, context?: LogContext) => void;
  warn: (message: string, context?: LogContext) => void;
  error: (message: string, context?: LogContext) => void;
  checkout: (action: string, context?: LogContext) => void;
  webhook: (provider: string, event: string, context?: LogContext) => void;
  cron: (job: string, context?: LogContext) => void;
  auth: (action: string, context?: LogContext) => void;
  ai: (action: string, context?: LogContext) => void;
  db: (query: string, context?: LogContext) => void;
  payment: (event: string, context?: LogContext) => void;
}

const SERVICE = "edukora";

function formatEntry(level: LogLevel, message: string, context?: LogContext): string {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
    service: SERVICE,
  };
  return JSON.stringify(entry);
}

function createLogger(): Logger {
  const base = {
    debug: (message: string, context?: LogContext) => {
      if (process.env.NODE_ENV === "development") {
        console.debug(formatEntry("debug", message, context));
      }
    },
    info: (message: string, context?: LogContext) => {
      console.info(formatEntry("info", message, context));
    },
    warn: (message: string, context?: LogContext) => {
      console.warn(formatEntry("warn", message, context));
    },
    error: (message: string, context?: LogContext) => {
      console.error(formatEntry("error", message, context));
    },
  };

  return {
    ...base,
    checkout: (action: string, context?: LogContext) => base.info(`checkout:${action}`, context),
    webhook: (provider: string, event: string, context?: LogContext) => base.info(`webhook:${provider}:${event}`, context),
    cron: (job: string, context?: LogContext) => base.info(`cron:${job}`, context),
    auth: (action: string, context?: LogContext) => base.info(`auth:${action}`, context),
    ai: (action: string, context?: LogContext) => base.info(`ai:${action}`, context),
    db: (query: string, context?: LogContext) => base.debug(`db:${query}`, context),
    payment: (event: string, context?: LogContext) => base.info(`payment:${event}`, context),
  };
}

export const logger = createLogger();

// Helper pour compatibilité
export const log = {
  cron: (job: string, context?: LogContext) => logger.cron(job, context),
  webhook: (provider: string, event: string, context?: LogContext) => logger.webhook(provider, event, context),
  checkout: (action: string, context?: LogContext) => logger.checkout(action, context),
  ai: (action: string, context?: LogContext) => logger.ai(action, context),
  db: (query: string, context?: LogContext) => logger.db(query, context),
  auth: (action: string, context?: LogContext) => logger.auth(action, context),
  payment: (event: string, context?: LogContext) => logger.payment(event, context),
};