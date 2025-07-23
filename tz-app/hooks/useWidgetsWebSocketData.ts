import { useWidgetStore } from "@/stores/useWidgetStore";
import { useRef, useCallback, useEffect } from "react";

export function useWidgetsWebSocket() {
  const setWidgets = useWidgetStore((s) => s.setWidgets);
  const updateWidgetsPatch = useWidgetStore((s) => s.updateWidgetsPatch);
  const loading = useWidgetStore((s) => s.loading);
  const error = useWidgetStore((s) => s.error);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const isUnmountedRef = useRef(false);

  const connectWebSocket = useCallback(() => {
    if (isUnmountedRef.current) return;

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    console.log('[DEBUG] Создаю WebSocket ws://localhost:3001');
    const ws = new WebSocket("ws://localhost:3001");
    wsRef.current = ws;

    ws.onopen = () => {
      reconnectAttempts.current = 0;
      console.log("✅ WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data && data.type === 'full' && Array.isArray(data.widgets)) {
          setWidgets(data.widgets);
        } else if (data && data.type === 'patch' && Array.isArray(data.patch)) {
          updateWidgetsPatch(data.patch);
        } else {
          console.warn("⚠️ Invalid WS message format:", event.data);
        }
      } catch (err) {
        console.warn("⚠️ Invalid WS message:", event.data);
      }
    };

    ws.onerror = (e) => {
      console.error("❌ WebSocket error:", e);
    };

    ws.onclose = () => {
      if (isUnmountedRef.current) return;
      const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 30_000);
      reconnectAttempts.current += 1;

      reconnectTimeout.current = setTimeout(() => {
        connectWebSocket();
      }, delay);
    };
  }, [setWidgets, updateWidgetsPatch]);

  useEffect(() => {
    isUnmountedRef.current = false;
    if (!loading && !error) {
      connectWebSocket();
    }

    return () => {
      isUnmountedRef.current = true;
      if (wsRef.current) wsRef.current.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };
  }, [loading, error, connectWebSocket]);
}
