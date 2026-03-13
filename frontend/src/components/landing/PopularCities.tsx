const cities = ["Warangal", "Hyderabad", "Jaipur", "Varanasi", "Mysuru", "Kochi"];

export const PopularCities = () => (
  <section className="space-y-5">
    <h2 className="font-display text-3xl font-semibold">Popular cities</h2>
    <div className="grid gap-3 sm:grid-cols-3">
      {cities.map((city) => (
        <div key={city} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">{city}</div>
      ))}
    </div>
  </section>
);
