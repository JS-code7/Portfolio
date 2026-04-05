type LogEventType = "visit" | "click" | "project";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";
const pendingTimers = new Map<string, ReturnType<typeof setTimeout>>();

export const logEvent = (type: LogEventType, action: string, metadata: Record<string, unknown> = {}) => {
  const safeAction = String(action || "").trim().slice(0, 200);
  if (!safeAction) return;

  const key = `${type}:${safeAction}`;
  const existing = pendingTimers.get(key);
  if (existing) clearTimeout(existing);

  const timer = setTimeout(async () => {
    pendingTimers.delete(key);
    try {
      await fetch(`${API_BASE}/api/logs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          action: safeAction,
          metadata: {
            ...metadata,
            path: window.location.pathname,
            timestamp: new Date().toISOString(),
          },
        }),
      });
    } catch {
      // silent fail for non-blocking telemetry
    }
  }, 500);

  pendingTimers.set(key, timer);
};
