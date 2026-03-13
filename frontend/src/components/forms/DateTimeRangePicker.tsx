import { Input } from "./Input";

export const DateTimeRangePicker = ({ start, end, onStartChange, onEndChange }: {
  start: string;
  end: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
}) => (
  <div className="grid gap-3 sm:grid-cols-2">
    <Input type="datetime-local" value={start} onChange={(e) => onStartChange(e.target.value)} />
    <Input type="datetime-local" value={end} onChange={(e) => onEndChange(e.target.value)} />
  </div>
);
