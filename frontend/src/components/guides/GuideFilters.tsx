"use client";

import { Input } from "@/components/forms/Input";

interface GuideFiltersProps {
  city: string;
  onCityChange: (value: string) => void;
}

export const GuideFilters = ({ city, onCityChange }: GuideFiltersProps) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <Input placeholder="Filter by city" value={city} onChange={(e) => onCityChange(e.target.value)} />
  </div>
);
