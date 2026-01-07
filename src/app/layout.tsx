import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

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
  title: {
    default: "Ahmed Yasser | CS Graduate & AI Researcher",
    template: "%s | Ahmed Yasser",
  },
  description:
    "Dual-degree CS graduate from UMN and EUI. Digital Fellow at BSE Global. Published researcher at CHI 2025. Building AI agents and data-driven solutions.",
  keywords: [
    "Ahmed Yasser",
    "Software Engineer",
    "AI Researcher",
    "Data Science",
    "Machine Learning",
    "Brooklyn Nets",
    "BSE Global",
    "University of Minnesota",
  ],
  authors: [{ name: "Ahmed Yasser Hassanein" }],
  creator: "Ahmed Yasser Hassanein",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahmedyasser.dev",
    siteName: "Ahmed Yasser Portfolio",
    title: "Ahmed Yasser | CS Graduate & AI Researcher",
    description:
      "Dual-degree CS graduate. Digital Fellow at BSE Global. Published researcher at CHI 2025.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Yasser | CS Graduate & AI Researcher",
    description:
      "Dual-degree CS graduate. Digital Fellow at BSE Global. Published researcher at CHI 2025.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
