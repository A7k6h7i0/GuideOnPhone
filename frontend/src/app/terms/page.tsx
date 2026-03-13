export default function TermsPage() {
  return (
    <div className="space-y-6 rounded-3xl bg-white p-8 ring-1 ring-slate-200">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Terms & Conditions</h1>
        <p className="text-sm text-slate-600">Last updated: March 10, 2026</p>
      </div>

      <section className="space-y-3 text-sm text-slate-700">
        <p>
          These Terms govern your use of Guide on Phone. By accessing or using the platform, you agree to comply with
          these Terms. If you do not agree, do not use the platform.
        </p>
      </section>

      <section className="space-y-3 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Eligibility & Accounts</h2>
        <p>You must provide accurate information and keep your credentials secure.</p>
        <p>You are responsible for all activity under your account.</p>
      </section>

      <section className="space-y-3 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Bookings & Payments</h2>
        <p>Bookings are subject to guide availability and confirmation.</p>
        <p>Payments, refunds, and cancellations are governed by the booking policies shown at checkout.</p>
      </section>

      <section className="space-y-3 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Guide Verification</h2>
        <p>Guides must complete identity, face, and GST verification to be approved.</p>
        <p>We reserve the right to approve, suspend, or reject guides for safety or quality reasons.</p>
      </section>

      <section className="space-y-3 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Prohibited Conduct</h2>
        <p>No fraud, harassment, or misuse of platform data.</p>
        <p>No attempts to bypass security or manipulate bookings or payments.</p>
      </section>

      <section className="space-y-3 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Limitation of Liability</h2>
        <p>We are not liable for indirect or consequential damages related to platform use.</p>
      </section>

      <section className="space-y-3 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Termination</h2>
        <p>We may suspend or terminate accounts for violations of these Terms.</p>
      </section>

      <section className="space-y-3 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Changes</h2>
        <p>We may update these Terms. Continued use means acceptance of the updated Terms.</p>
      </section>

      <section className="space-y-3 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Contact</h2>
        <p>Questions? Email support at support@guidesonphone.com.</p>
      </section>
    </div>
  );
}
