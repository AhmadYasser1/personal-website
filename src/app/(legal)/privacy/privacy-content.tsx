import Link from "next/link";

export function PrivacyContent() {
  return (
    <>
      <h1 className="font-heading text-4xl font-bold sm:text-5xl">
        Privacy Policy<span className="text-emerald-500">.</span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: February 16, 2026
      </p>

      <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="mt-12 space-y-10 text-base leading-relaxed text-muted-foreground">
        <p>
          This is the personal portfolio website of Ahmad Yasser (ayasser.com).
          This policy explains what data is collected when you visit, why it is
          collected, and how it is handled. I keep this short and honest.
        </p>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            What information do I collect?
          </h2>

          <div className="space-y-3">
            <h3 className="font-heading text-lg font-medium text-foreground">
              Information you provide
            </h3>
            <p>
              If you use the contact form, I collect the name, email address,
              and message you submit. Nothing else is collected unless you choose
              to send it.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-heading text-lg font-medium text-foreground">
              Information collected automatically
            </h3>
            <p>
              When you visit the site, certain data is collected automatically:
              device type, browser, operating system, approximate location
              (country and city), pages visited, and how you interact with the
              site. This includes behavioral data such as mouse movements, scroll
              depth, clicks, and session recordings collected through Microsoft
              Clarity. Your IP address is temporarily processed for rate limiting
              and bot protection but is not stored long-term.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Why do I collect this data?
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">Contact form data</strong> —
              to read and respond to your messages
            </li>
            <li>
              <strong className="text-foreground">
                Analytics and behavioral data
              </strong>{" "}
              — to understand how visitors use the site and improve it
            </li>
            <li>
              <strong className="text-foreground">Rate limiting</strong> — to
              prevent abuse of the contact form
            </li>
            <li>
              <strong className="text-foreground">Bot detection</strong> — to
              protect the contact form from spam
            </li>
          </ul>
          <p>I do not sell your data to anyone.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Third-party services
          </h2>
          <p>
            This site uses the following services. Each has its own privacy
            policy that governs how it handles data:
          </p>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong className="text-foreground">
                <a
                  href="https://privacy.microsoft.com/privacystatement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 underline decoration-emerald-500/30 underline-offset-2 transition-colors hover:text-emerald-400"
                >
                  Microsoft Clarity
                </a>
              </strong>{" "}
              — records session replays, generates heatmaps, and collects
              behavioral data including mouse movements, clicks, and scrolling.
              Uses first-party and third-party cookies. Data may be used by
              Microsoft for advertising purposes.
            </li>
            <li>
              <strong className="text-foreground">
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 underline decoration-emerald-500/30 underline-offset-2 transition-colors hover:text-emerald-400"
                >
                  Vercel Analytics
                </a>
              </strong>{" "}
              — anonymous, cookie-free website analytics. No personal data is
              collected or stored.
            </li>
            <li>
              <strong className="text-foreground">
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 underline decoration-emerald-500/30 underline-offset-2 transition-colors hover:text-emerald-400"
                >
                  Vercel Speed Insights
                </a>
              </strong>{" "}
              — anonymous performance measurement (page load times, Core Web
              Vitals). No personal data is collected.
            </li>
            <li>
              <strong className="text-foreground">
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 underline decoration-emerald-500/30 underline-offset-2 transition-colors hover:text-emerald-400"
                >
                  Cloudflare Turnstile
                </a>
              </strong>{" "}
              — bot detection on the contact form. Processes browser signals and
              IP address to verify you are human. Does not use cookies.
            </li>
            <li>
              <strong className="text-foreground">
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 underline decoration-emerald-500/30 underline-offset-2 transition-colors hover:text-emerald-400"
                >
                  Resend
                </a>
              </strong>{" "}
              — processes contact form submissions for email delivery. Data is
              encrypted at rest.
            </li>
            <li>
              <strong className="text-foreground">
                <a
                  href="https://upstash.com/trust/privacy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 underline decoration-emerald-500/30 underline-offset-2 transition-colors hover:text-emerald-400"
                >
                  Upstash
                </a>
              </strong>{" "}
              — temporarily stores IP addresses for rate limiting. Data is
              automatically deleted after the rate limit window (60 seconds).
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Cookies
          </h2>
          <p>
            This site itself does not set cookies. However, Microsoft Clarity
            sets first-party cookies (
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
              _clck
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
              _clsk
            </code>
            ) for session tracking, and third-party Microsoft cookies (such as{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
              MUID
            </code>
            ) may also be set.
          </p>
          <p>
            You are asked for consent before analytics cookies are activated.
            You can also disable cookies in your browser settings at any time.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            How long is data kept?
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">Contact form messages</strong>{" "}
              — kept in my email inbox until I no longer need them
            </li>
            <li>
              <strong className="text-foreground">
                Microsoft Clarity data
              </strong>{" "}
              — retained 30 days to 13 months by Microsoft
            </li>
            <li>
              <strong className="text-foreground">Rate limiting records</strong>{" "}
              — automatically deleted after 60 seconds
            </li>
            <li>
              <strong className="text-foreground">
                Vercel Analytics and Speed Insights
              </strong>{" "}
              — anonymous and aggregated, not tied to any individual
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Your rights
          </h2>
          <p>
            You can email me at{" "}
            <a
              href="mailto:hey@ayasser.com"
              className="text-emerald-500 underline decoration-emerald-500/30 underline-offset-2 transition-colors hover:text-emerald-400"
            >
              hey@ayasser.com
            </a>{" "}
            to request what personal data I hold about you, ask for it to be
            deleted, or ask for it to be corrected.
          </p>
          <p>
            If you are in the European Union, you also have the right to
            withdraw cookie consent at any time (by clearing your browser
            cookies or local storage), the right to lodge a complaint with your
            local data protection authority, and the rights to data access,
            rectification, erasure, and portability under the GDPR. The legal
            basis for processing is consent for analytics cookies and legitimate
            interest for responding to contact form messages, rate limiting, and
            security.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Do Not Track
          </h2>
          <p>This site does not respond to Do Not Track browser signals.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Changes to this policy
          </h2>
          <p>
            If this policy changes, the updated version will be posted on this
            page with a new date.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Contact
          </h2>
          <p>
            Questions about this policy? Email me at{" "}
            <a
              href="mailto:hey@ayasser.com"
              className="text-emerald-500 underline decoration-emerald-500/30 underline-offset-2 transition-colors hover:text-emerald-400"
            >
              hey@ayasser.com
            </a>
            .
          </p>
        </section>

        <div className="pt-6">
          <Link
            href="/"
            className="text-sm text-emerald-500 underline decoration-emerald-500/30 underline-offset-2 transition-colors hover:text-emerald-400"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </>
  );
}
