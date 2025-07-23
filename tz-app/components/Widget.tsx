import React from "react";
import { WIDGET_WIDTH, WIDGET_HEIGHT } from "@/constants/constants";
import { getColorByValue } from "@/utils/getColorByValue";

type WidgetProps = {
  name: string;
  value: number;
}

function Widget({ name, value }: WidgetProps) {
  return (
    <div 
      style={{ width: WIDGET_WIDTH, height: WIDGET_HEIGHT }}
      className={`
        flex flex-col justify-between text-[8px]
        ${getColorByValue(value)}
      `}
    >
      <span>{name}</span>
      <span className="self-end">{value}</span>
    </div>
  );
}

function areEqual(prevProps: WidgetProps, nextProps: WidgetProps) {
  return prevProps.name === nextProps.name && prevProps.value === nextProps.value;
}

export default React.memo(Widget, areEqual);
