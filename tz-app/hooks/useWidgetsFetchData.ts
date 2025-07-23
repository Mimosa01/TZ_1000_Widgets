import { useEffect } from "react";
import { useWidgetStore } from "@/stores/useWidgetStore";
import { Widget } from "@/types/widget";

export function useWidgetsFetchData() {
  const setWidgets = useWidgetStore((s) => s.setWidgets);
  const setLoading = useWidgetStore((s) => s.setLoading);
  const setError = useWidgetStore((s) => s.setError);
  const loading = useWidgetStore((s) => s.loading);
  const error = useWidgetStore((s) => s.error);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchWidgets = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3001/api/widgets", { signal });

        if (!res.ok) throw new Error("Failed to fetch widgets");

        const data: Widget[] = await res.json();
        setWidgets(data);
        setError(null);
      } catch (err: unknown) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          setError(err instanceof Error ? err : new Error("Unknown error"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWidgets();

    return () => {
      controller.abort();
    };
  }, [setWidgets, setLoading, setError]);

  return { loading, error };
}
