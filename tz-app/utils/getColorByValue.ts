export function getColorByValue(value: number): string {
  if (value > 50) return 'bg-widget-red';
  if (value < -50) return 'bg-widget-blue';
  return 'bg-widget-gray';
}
