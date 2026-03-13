 "use client";

import Link from "next/link";
import { useAuthStore } from "@/store";
import { demoGuides } from "@/lib/demoGuides";
import { APP_ROUTES } from "@/lib/routes";

export default function HomePage() {
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  return (
    <main className="space-y-12 pb-16">
      <section className="rounded-3xl bg-white p-8 ring-1 ring-slate-200">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold sm:text-4xl">Find verified local guides in minutes.</h1>
            <p className="text-sm text-slate-600 sm:text-base">
              Browse guides by city, language, and services. Book securely once you are ready.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides" className="rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white">
                Find guides
              </Link>
              <Link href={APP_ROUTES.userLogin} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-ink">
                Login to book
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">How it works</p>
            <ol className="mt-3 list-decimal space-y-2 pl-4">
              <li>Browse guides by city, language, and services.</li>
              <li>View profiles, ratings, and fees.</li>
              <li>Login or create an account to book.</li>
            </ol>
            <Link href="/how-it-works" className="mt-4 inline-block text-sm font-semibold text-ink">
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Find guides</h2>
            <p className="text-sm text-slate-600">Featured guides across popular destinations.</p>
          </div>
          <Link href="/guides" className="text-sm font-semibold text-ink">
            View all guides
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demoGuides.map((guide) => (
            <div key={guide.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-lg font-semibold">{guide.name}</p>
              <p className="text-sm text-slate-600">{guide.city}, {guide.state}</p>
              <p className="mt-2 text-sm text-slate-700">{guide.bio}</p>
              <div className="mt-3 text-sm text-slate-700">
                <p>Languages: {guide.languages.join(", ")}</p>
                <p>Hours: {guide.availableHours}</p>
                <p>Rating: {guide.avgRating.toFixed(1)} | INR {guide.guideFee}/trip</p>
                <p>Cab booking: {guide.cabBooking ? "Yes" : "No"} | Hotel booking: {guide.hotelBooking ? "Yes" : "No"}</p>
                <p>Phone: {guide.phone}</p>
              </div>
              {isHydrated && user ? (
                <span className="mt-4 inline-flex rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                  Bookings opening soon
                </span>
              ) : (
                <Link href={APP_ROUTES.userLogin} className="mt-4 inline-block rounded-xl bg-ink px-3 py-2 text-sm font-semibold text-white">
                  Sign in to book
                </Link>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500">
          Featured profiles are sample listings shown while verification is in progress.
        </p>
      </section>
    </main>
  );
}
