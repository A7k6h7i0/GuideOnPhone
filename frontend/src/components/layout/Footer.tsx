import Link from "next/link";

export const Footer = () => (
  <footer className="app-footer mt-20 border-t border-slate-200 bg-white">
    <div className="container-shell grid gap-4 py-8 text-sm text-slate-600 md:grid-cols-[1fr_auto] md:items-center">
      <div className="space-y-1">
        <p>Guide on Phone - Verified local support for smarter travel.</p>
        <p>Copyright {new Date().getFullYear()} Guide on Phone</p>
      </div>
      <div className="flex flex-wrap gap-4 font-semibold text-ink">
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms & Conditions</Link>
      </div>
    </div>
  </footer>
);
