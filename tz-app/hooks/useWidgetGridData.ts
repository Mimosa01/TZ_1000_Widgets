import { useMemo } from "react";
import { useWidgetStore } from "@/stores/useWidgetStore";
import { calculateColumnCount, calculateRowCount } from "@/utils/gridCalculations";
import { useDebouncedWindowSize } from "./useDebounceWindowSize";

export function useWidgetGridData() {
  const windowSize = useDebouncedWindowSize(100);
  const widgetIds = useWidgetStore((state) => state.widgetIds);
  const widgetsById = useWidgetStore((state) => state.widgetsById);

  const widgetsArray = useMemo(() => widgetIds.map(id => widgetsById[id]), [widgetIds, widgetsById]);

  const columnCount = useMemo(() => calculateColumnCount(windowSize.width), [windowSize.width]);
  const rowCount = useMemo(() => calculateRowCount(widgetsArray.length, columnCount), [widgetsArray.length, columnCount]);

  return { windowSize, widgetsArray, columnCount, rowCount };
}
