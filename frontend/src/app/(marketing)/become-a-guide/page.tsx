import Link from "next/link";

export default function BecomeGuidePage() {
  return (
    <section className="space-y-6 rounded-3xl bg-white p-8 ring-1 ring-slate-200">
      <h1 className="text-3xl font-semibold">Become a Guide</h1>
      <p className="text-sm text-slate-700">Submit Aadhaar and two GST references to get verified before activation.</p>
      <Link href="/register?role=AGENT" className="inline-block rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white">Register as Agent</Link>
    </section>
  );
}
