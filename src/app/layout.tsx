import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollConfig } from "@/components/ui/scroll-config";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl } from "@/lib/site";

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
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ahmad Yasser | HCI Researcher",
    template: "%s | Ahmad Yasser",
  },
  description:
    "Dual-degree CS graduate from University of Minnesota-Twin Cities. Digital Fellow at Brooklyn Sports and Entertainment. HCI Researcher with 2+ publications.",
  keywords: [
    "Ahmad Yasser",
    "Software Engineer",
    "HCI Researcher",
    "Data Science",
    "Machine Learning",
    "Brooklyn Nets",
    "Brooklyn Sports and Entertainment",
    "University of Minnesota",
  ],
  authors: [{ name: "Ahmad Yasser Hassanein" }],
  creator: "Ahmad Yasser Hassanein",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ahmad Yasser Portfolio",
    title: "Ahmad Yasser | HCI Researcher",
    description:
      "Dual-degree CS graduate. Digital Fellow at Brooklyn Sports and Entertainment. HCI Researcher.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Yasser | HCI Researcher",
    description:
      "Dual-degree CS graduate. Digital Fellow at Brooklyn Sports and Entertainment. HCI Researcher.",
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
          <ScrollConfig />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        {isVercelDeployment ? <SpeedInsights /> : null}
        {isVercelDeployment ? <Analytics /> : null}
      </body>
    </html>
  );
}
