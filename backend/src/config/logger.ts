type LogMeta = Record<string, unknown>;

const withMeta = (meta?: LogMeta) => (meta ? ` ${JSON.stringify(meta)}` : "");

export const logger = {
  info: (message: string, meta?: LogMeta) => console.log(`[INFO] ${message}${withMeta(meta)}`),
  warn: (message: string, meta?: LogMeta) => console.warn(`[WARN] ${message}${withMeta(meta)}`),
  error: (message: string, meta?: LogMeta) => console.error(`[ERROR] ${message}${withMeta(meta)}`)
};
