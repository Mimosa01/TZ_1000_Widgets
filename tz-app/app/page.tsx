"use client";

import WidgetGrid from "@/components/WidgetGrid";
import { useWidgetsFetchData } from "@/hooks/useWidgetsFetchData";
import { useWidgetsWebSocket } from "@/hooks/useWidgetsWebSocketData";

export default function Home() {
  const { loading, error } = useWidgetsFetchData();
  useWidgetsWebSocket();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <WidgetGrid />;
}
