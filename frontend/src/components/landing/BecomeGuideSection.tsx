import Link from "next/link";

export const BecomeGuideSection = () => (
  <section className="rounded-3xl bg-amber-100 p-8">
    <h3 className="font-display text-2xl font-semibold">Become a trusted local guide</h3>
    <p className="mt-2 text-sm text-slate-700">Upload Aadhaar details and GST references. Start earning from your city knowledge.</p>
    <Link href="/become-a-guide" className="mt-4 inline-block text-sm font-semibold text-brand-900">Apply as guide</Link>
  </section>
);
