import Link from "next/link";

export const CTASection = () => (
  <section className="rounded-3xl bg-ink px-8 py-10 text-white">
    <h3 className="font-display text-2xl font-semibold">Ready for stress-free travel?</h3>
    <p className="mt-2 text-slate-300">Find a verified local guide and explore confidently.</p>
    <Link href="/guides" className="mt-4 inline-block rounded-xl bg-white px-4 py-2 text-sm font-semibold text-ink">Browse Guides</Link>
  </section>
);
