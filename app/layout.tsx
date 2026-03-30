import type { Metadata } from "next";
import { Amiko, EB_Garamond, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const amiko = Amiko({
  weight: ["400", "600", "700"],
  variable: "--font-amiko",
  subsets: ["latin"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  weight: ["400", "500", "600", "700"],
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daniel Febrian Eka Wijaya — Fullstack Software Engineer",
  description:
    "Fullstack Software Engineer specializing in Spring Boot, NestJS, Go Echo, and Next.js. Shipped 4 production apps solo in under a year.",
  keywords:
    "fullstack engineer, software engineer, spring boot, nestjs, golang, nextjs, indonesia, portfolio",
  authors: [{ name: "Daniel Febrian Eka Wijaya" }],
  openGraph: {
    title: "Daniel Febrian — Fullstack Software Engineer",
    description: "I build end-to-end web applications. 4 production apps shipped solo.",
    type: "website",
    images: [{ url: "/og-image.png" }],
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Daniel Febrian Eka Wijaya",
      jobTitle: "Fullstack Software Engineer",
      url: "https://danielfebrian.dev",
      sameAs: ["https://github.com/danielfebrianew"],
      knowsAbout: ["Spring Boot", "NestJS", "Go", "Next.js", "PostgreSQL", "MySQL"],
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${amiko.variable} ${ebGaramond.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
