interface CityPageProps {
  params: { citySlug: string };
}

export default function CityPage({ params }: CityPageProps) {
  return (
    <section className="rounded-3xl bg-white p-8 ring-1 ring-slate-200">
      <h1 className="text-3xl font-semibold capitalize">Explore {params.citySlug.replace(/-/g, " ")}</h1>
      <p className="mt-2 text-sm text-slate-700">Browse verified local guides and travel support for this city.</p>
    </section>
  );
}
