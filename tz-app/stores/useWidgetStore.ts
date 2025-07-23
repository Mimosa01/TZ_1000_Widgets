import { Widget } from "@/types/widget";
import { create } from "zustand";

type WidgetsById = { [id: number]: Widget };

export type WidgetStore = {
  widgetsById: WidgetsById;
  widgetIds: number[];
  loading: boolean;
  error: Error | null;
  setWidgets: (widgets: Widget[]) => void;
  updateWidgetValue: (id: number, value: number) => void;
  updateWidgetsPatch: (patch: { id: number; value: number }[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
};

export const useWidgetStore = create<WidgetStore>((set) => ({
  widgetsById: {},
  widgetIds: [],
  loading: true,
  error: null,

  setWidgets: (widgets) => {
    const widgetsById: WidgetsById = {};
    const widgetIds: number[] = [];
    widgets.forEach((w) => {
      widgetsById[w.id] = w;
      widgetIds.push(w.id);
    });
    set({
      widgetsById,
      widgetIds,
      loading: false,
      error: null,
    });
  },

  updateWidgetValue: (id, value) =>
    set((state) => {
      const widget = state.widgetsById[id];
      if (!widget || widget.value === value) return {};
      return {
        widgetsById: {
          ...state.widgetsById,
          [id]: { ...widget, value },
        },
      };
    }),

  updateWidgetsPatch: (patch) =>
    set((state) => {
      const newWidgetsById = { ...state.widgetsById };
      let changed = false;
      patch.forEach(({ id, value }) => {
        const widget = newWidgetsById[id];
        if (widget && widget.value !== value) {
          newWidgetsById[id] = { ...widget, value };
          changed = true;
        }
      });
      if (!changed) return {};
      return { widgetsById: newWidgetsById };
    }),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
