import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const Hero = () => (
  <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-700 to-emerald-500 px-6 py-20 text-white sm:px-12">
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">Local Guides. One Phone Call Away.</h1>
      <p className="text-lg text-emerald-50">Book verified local experts in any city and explore without confusion, language barriers, or route uncertainty.</p>
      <div className="flex gap-3">
        <Link href="/guides"><Button variant="secondary">Find a Guide</Button></Link>
        <Link href="/register"><Button className="bg-ink hover:bg-slate-900">Start Now</Button></Link>
      </div>
    </div>
  </section>
);
