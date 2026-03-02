import Link from "next/link";

export function TermsContent() {
  return (
    <>
      <h1 className="font-heading text-4xl font-bold sm:text-5xl">
        Terms of Service<span className="text-emerald-500">.</span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: February 16, 2026
      </p>

      <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="mt-12 space-y-10 text-base leading-relaxed text-muted-foreground">
        <p>
          By using this website, you agree to these terms. If you do not agree,
          please do not use the site.
        </p>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            What this site is
          </h2>
          <p>
            ayasser.com is a personal portfolio website that showcases my
            projects, experience, research, and open-source work. It is provided
            for informational purposes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Intellectual property
          </h2>
          <p>
            All content on this site — including text, images, code samples,
            designs, and other creative work — belongs to Ahmad Yasser unless
            otherwise noted. You may not copy, reproduce, or redistribute this
            content without written permission. Some portfolio items may
            represent work created for employers or clients; those remain the
            property of their respective owners.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            No warranties
          </h2>
          <p>
            This site is provided &ldquo;as is&rdquo; without warranties of any
            kind. I do not guarantee that the site will be error-free, available
            at all times, or that all information will be completely accurate.
            Portfolio content may represent past work and may not reflect
            current capabilities or views.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Limitation of liability
          </h2>
          <p>
            I am not liable for any damages arising from the use of this
            website, including but not limited to direct, indirect, incidental,
            or consequential damages.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            External links
          </h2>
          <p>
            This site may contain links to third-party websites. I am not
            responsible for their content, privacy practices, or availability.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Governing law
          </h2>
          <p>
            These terms are governed by the laws of the State of New York,
            United States.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Changes and contact
          </h2>
          <p>
            I may update these terms at any time. Changes will be posted on this
            page with an updated date. For questions, email me at{" "}
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
