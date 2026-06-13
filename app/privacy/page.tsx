import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";

export const metadata: Metadata = {
  title: "Privacy Policy â€” HireNove",
  description: "How HireNove collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="pt-36 pb-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-slate-900 mb-3 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm mb-12">Last updated: June 2026</p>

          <div className="prose prose-slate max-w-none space-y-10 text-slate-500 leading-relaxed">

            <div>
              <h2 className="text-xl font-display font-semibold text-slate-900 mb-3">Who we are</h2>
              <p>HireNove is a workflow optimisation consultancy for recruitment firms, operated by Anisa Leci. Our website is <span className="text-slate-700">hirenove.com</span>. If you have any questions about this policy, contact us at <a href="mailto:anisa@hirenove.com" className="text-violet-600 hover:underline">anisa@hirenove.com</a>.</p>
            </div>

            <div>
              <h2 className="text-xl font-display font-semibold text-slate-900 mb-3">What information we collect</h2>
              <p>We only collect information you actively provide to us through our contact forms:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1.5">
                <li><strong className="text-slate-700">Discovery Call form:</strong> name, company, email address, and any details you include in your message.</li>
                <li><strong className="text-slate-700">Help Us Learn form:</strong> email address, company name, and your responses to our research questions.</li>
                <li><strong className="text-slate-700">Pilot Program form:</strong> name, company, email address, role, and a description of your operational challenges.</li>
              </ul>
              <p className="mt-3">We do not use cookies for tracking, do not run advertising pixels, and do not collect any data passively beyond what your browser sends to any web server (such as your IP address and browser type).</p>
            </div>

            <div>
              <h2 className="text-xl font-display font-semibold text-slate-900 mb-3">How we use your information</h2>
              <p>Information you submit is used solely to:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1.5">
                <li>Respond to your enquiry or book a discovery call</li>
                <li>Conduct internal research to understand recruitment firm challenges (Help Us Learn responses)</li>
                <li>Review and respond to Pilot Program applications</li>
              </ul>
              <p className="mt-3">We do not sell, rent, or share your information with third parties for marketing purposes.</p>
            </div>

            <div>
              <h2 className="text-xl font-display font-semibold text-slate-900 mb-3">How we store your information</h2>
              <p>Form submissions are delivered to us via <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Resend</a>, a transactional email service. Emails are stored in our inbox and handled with the same care as any business correspondence. We do not store your information in external databases beyond what email naturally retains.</p>
              <p className="mt-3">Our website is hosted on <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Vercel</a>. Basic server logs (IP address, request metadata) may be retained by Vercel in accordance with their own privacy policy.</p>
            </div>

            <div>
              <h2 className="text-xl font-display font-semibold text-slate-900 mb-3">Your rights</h2>
              <p>Under GDPR and applicable data protection law, you have the right to:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1.5">
                <li>Request access to the personal data we hold about you</li>
                <li>Request that we correct or delete your data</li>
                <li>Withdraw consent at any time (where processing is based on consent)</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, email <a href="mailto:anisa@hirenove.com" className="text-violet-600 hover:underline">anisa@hirenove.com</a>. We will respond within 30 days.</p>
            </div>

            <div>
              <h2 className="text-xl font-display font-semibold text-slate-900 mb-3">Changes to this policy</h2>
              <p>We may update this policy from time to time. When we do, we will update the date at the top of this page. Continued use of the site after changes constitutes acceptance of the updated policy.</p>
            </div>

            <div className="border-t border-black/6 pt-8">
              <p className="text-sm">Questions? Reach us at <a href="mailto:anisa@hirenove.com" className="text-violet-600 hover:underline">anisa@hirenove.com</a></p>
            </div>

          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
