import React, { useCallback } from "react";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import { WIDGET_WIDTH, WIDGET_HEIGHT, WIDGET_GAP } from "@/constants/constants";
import { useWidgetGridData } from "@/hooks/useWidgetGridData";
import Widget from "./Widget";

const WidgetGrid: React.FC = () => {
  const { windowSize, widgetsArray, columnCount, rowCount } = useWidgetGridData();

  const Cell = useCallback(({ columnIndex, rowIndex, style, data, isScrolling }: GridChildComponentProps) => {
    const index = rowIndex * columnCount + columnIndex;
    const widget = data[index];

    const adjustedStyle = {
      ...style,
      left: (style.left as number) + WIDGET_GAP,
      top: (style.top as number) + WIDGET_GAP,
      width: (style.width as number) - WIDGET_GAP,
      height: (style.height as number) - WIDGET_GAP,
    };

    if (!widget) return null;

    if (isScrolling) {
      return (
        <div style={adjustedStyle}>
          <div style={{ width: WIDGET_WIDTH, height: WIDGET_HEIGHT, background: '#eee', borderRadius: 4 }} />
        </div>
      );
    }

    return (
      <div style={adjustedStyle}>
        <Widget key={widget.id} name={widget.name} value={widget.value} />
      </div>
    );
  }, [columnCount]);

  return (
    <Grid
      columnCount={columnCount}
      rowCount={rowCount}
      columnWidth={WIDGET_WIDTH + WIDGET_GAP}
      rowHeight={WIDGET_HEIGHT + WIDGET_GAP}
      width={windowSize.width}
      height={windowSize.height}
      overscanRowCount={10}
      overscanColumnCount={4}
      itemData={widgetsArray}
    >
      {Cell}
    </Grid>
  );
};

export default React.memo(WidgetGrid);
