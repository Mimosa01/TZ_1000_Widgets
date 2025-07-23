import { WIDGET_WIDTH, WIDGET_GAP } from "@/constants/constants";

export function calculateColumnCount(windowWidth: number, minColumns = 2): number {
  return Math.max(minColumns, Math.floor(windowWidth / (WIDGET_WIDTH + WIDGET_GAP)));
}

export function calculateRowCount(
  totalWidgets: number,
  columnCount: number,
  minRows = 10
): number {
  const maxNeededRows = Math.ceil(totalWidgets / columnCount);
  return Math.max(minRows, maxNeededRows);
}
