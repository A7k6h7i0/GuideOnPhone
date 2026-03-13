const steps = [
  "Search verified guides by city and language",
  "Compare prices, ratings, and availability",
  "Book instantly and get support over phone",
  "Pay securely and leave a review"
];

export const HowItWorks = () => (
  <section className="space-y-6">
    <h2 className="font-display text-3xl font-semibold">How it works</h2>
    <div className="grid gap-4 sm:grid-cols-2">
      {steps.map((step, i) => (
        <div key={step} className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold text-brand-700">Step {i + 1}</p>
          <p className="mt-2 text-sm text-slate-700">{step}</p>
        </div>
      ))}
    </div>
  </section>
);
