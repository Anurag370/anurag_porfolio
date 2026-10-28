import type { Metadata, Viewport } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site, siteUrl } from "@/config/site";
import { visibleSocialLinks } from "@/config/social-links";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  fallback: ["system-ui", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  fallback: ["ui-monospace", "monospace"],
});

const socialProfiles = visibleSocialLinks()
  .filter((link) => link.href.startsWith("http"))
  .map((link) => link.href);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.brand}`,
  },
  description: site.description,
  keywords: [
    site.name,
    "full-stack developer",
    "AI engineer",
    "React",
    "Next.js",
    "FastAPI",
    "PyTorch",
    "portfolio",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.brand,
    title: `${site.name} — ${site.title}`,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description: site.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0e0f" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: siteUrl,
  jobTitle: site.title,
  description: site.tagline,
  email: `mailto:${site.email}`,
  sameAs: socialProfiles,
  knowsAbout: [
    "Full-Stack Development",
    "Web Applications",
    "Artificial Intelligence",
    "Machine Learning",
    "Computer Vision",
    "Backend Engineering",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme={site.theme.default}
          enableSystem={site.theme.default === "system"}
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
