interface TabsProps {
  items: string[];
  active: string;
  onChange: (value: string) => void;
}

export const Tabs = ({ items, active, onChange }: TabsProps) => (
  <div className="flex gap-2">
    {items.map((item) => (
      <button
        key={item}
        onClick={() => onChange(item)}
        className={`rounded-full px-4 py-2 text-sm ${active === item ? "bg-ink text-white" : "bg-slate-100 text-slate-700"}`}
      >
        {item}
      </button>
    ))}
  </div>
);
