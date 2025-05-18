import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase:
    process.env.NODE_ENV === "development"
      ? new URL("http://localhost:3000")
      : new URL("https://ezprompt.io"),
  title: "EzPrompt — Structure et génère tes prompts facilement",
  description:
    "Crée, réutilise et partage des modèles de prompts clairs et efficaces pour tes projets dev et IA.",
  authors: [{ name: "Équipe EzPrompt", url: "https://ezprompt.io" }],
  keywords: [
    "EzPrompt",
    "Prompt engineering",
    "SaaS",
    "Dev tools",
    "AI prompts",
    "Prompt templates",
    "Next.js",
    "Minimal UI",
  ],
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "EzPrompt — Structure et génère tes prompts facilement",
    description:
      "Gagne du temps en formatant tes prompts pour l'IA avec des templates dynamiques.",
    url: "https://ezprompt.io",
    siteName: "EzPrompt",
    images: [
      {
        url: "/og-image.png", // place un visuel dans /public
        width: 1200,
        height: 630,
        alt: "Aperçu de l’interface EzPrompt",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
