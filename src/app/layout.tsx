import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollConfig } from "@/components/ui/scroll-config";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { MotionProvider } from "@/components/motion-provider";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { PageTransition } from "@/components/page-transition";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ClarityProvider } from "@/components/clarity-provider";
import { siteConfig } from "@/config/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Human-Computer Interaction Researcher`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Ahmad Yasser",
    "Software Engineer",
    "Human-Computer Interaction Researcher",
    "Data Science",
    "Machine Learning",
    "Brooklyn Nets",
    "Brooklyn Sports and Entertainment",
    "University of Minnesota",
  ],
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: `${siteConfig.name} Portfolio`,
    title: `${siteConfig.name} | Human-Computer Interaction Researcher`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Human-Computer Interaction Researcher`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const isVercelDeployment = process.env.VERCEL === "1";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-body antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>
            <SmoothScrollProvider>
              <ScrollConfig />
              <Navbar />
              <main className="flex-1">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
              <CustomCursor />
            </SmoothScrollProvider>
          </MotionProvider>
        </ThemeProvider>
        {isVercelDeployment ? <SpeedInsights /> : null}
        {isVercelDeployment ? <Analytics /> : null}
        {process.env.CLARITY_PROJECT_ID && process.env.VERCEL_ENV === "production" ? (
          <ClarityProvider projectId={process.env.CLARITY_PROJECT_ID} />
        ) : null}
      </body>
    </html>
  );
}
