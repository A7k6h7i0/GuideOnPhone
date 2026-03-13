const items = [
  { name: "Sarah, USA", text: "Booked a Warangal guide in 5 minutes and covered all heritage spots smoothly." },
  { name: "Ravi, Guide", text: "The platform helped me earn extra income while helping tourists remotely." }
];

export const Testimonials = () => (
  <section className="space-y-4">
    <h2 className="font-display text-3xl font-semibold">Testimonials</h2>
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <blockquote key={item.name} className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
          "{item.text}"
          <footer className="mt-3 font-semibold text-slate-900">{item.name}</footer>
        </blockquote>
      ))}
    </div>
  </section>
);
