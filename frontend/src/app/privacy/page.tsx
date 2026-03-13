export default function PrivacyPage() {
  return (
    <div className="space-y-6 rounded-3xl bg-white p-8 ring-1 ring-slate-200">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Privacy Policy</h1>
        <p className="text-sm text-slate-600">Last updated: March 10, 2026</p>
      </div>

      <section className="space-y-3 text-sm text-slate-700">
        <p>
          We take privacy seriously. This policy explains what we collect, why we collect it, how we use it, and the
          controls you have. By using Guide on Phone, you agree to the terms below.
        </p>
      </section>

      <section className="space-y-3 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Information We Collect</h2>
        <p>Account data: name, email, phone, and login credentials.</p>
        <p>Booking data: guide selection, trip details, city, dates, and payment records.</p>
        <p>Verification data for agents: Aadhaar OTP status, face match outcomes, GST verification references.</p>
        <p>Technical data: device, browser, IP address, and usage analytics.</p>
      </section>

      <section className="space-y-3 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">How We Use Data</h2>
        <p>Provide and improve the platform, including bookings, support, and security.</p>
        <p>Verify agents and maintain platform trust and safety.</p>
        <p>Process payments and issue receipts.</p>
        <p>Comply with legal obligations and prevent fraud.</p>
      </section>

      <section className="space-y-3 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Data Sharing</h2>
        <p>We share data only with service providers required for operations (payments, messaging, verification).</p>
        <p>We may disclose data when required by law or to protect users and the platform.</p>
        <p>We do not sell personal data.</p>
      </section>

      <section className="space-y-3 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Retention</h2>
        <p>We retain data only as long as necessary for the purposes stated above or as required by law.</p>
      </section>

      <section className="space-y-3 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Your Choices</h2>
        <p>Access and update your profile information from your dashboard.</p>
        <p>Request account deletion by contacting support.</p>
      </section>

      <section className="space-y-3 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Security</h2>
        <p>We use reasonable technical and organizational measures to protect data against loss and misuse.</p>
      </section>

      <section className="space-y-3 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Contact</h2>
        <p>Questions? Email support at support@guidesonphone.com.</p>
      </section>
    </div>
  );
}
