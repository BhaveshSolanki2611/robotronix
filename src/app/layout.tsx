import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/app/providers/SmoothScroll";
import CursorWrapper from "@/components/cursor/CursorWrapper";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.robotronix.in";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Robotronix",
  title: {
    default: "Robotronix | Robots Built for Where Humans Can't Go",
    template: "%s | Robotronix",
  },
  description:
    "Patent-granted robotics for confined spaces, heights, and hazardous environments. Made in India, deployed worldwide. Disrupting industrial safety.",
  keywords: [
    "robotics",
    "NDT inspection",
    "confined space robots",
    "hazmat robots",
    "industrial robots India",
    "robotic inspection",
    "non-destructive testing",
    "Robotronix",
  ],
  authors: [{ name: "Robotronix and Scalability Technology Pvt. Ltd." }],
  creator: "Robotronix and Scalability Technology Pvt. Ltd.",
  publisher: "Robotronix and Scalability Technology Pvt. Ltd.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "Robotronix — Made in India for the World",
    description:
      "Patent-granted robotics for confined spaces, heights, and hazardous environments. Disrupting industrial safety from India.",
    siteName: "Robotronix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robotronix — Made in India for the World",
    description:
      "Patent-granted robotics for confined spaces, heights, and hazardous environments.",
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
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body
        className="min-h-screen flex flex-col antialiased"
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          <CursorWrapper />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
