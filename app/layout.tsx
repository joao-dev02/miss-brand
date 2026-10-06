import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
export const metadata: Metadata = {
  title: "Miss Brand — Seu estilo, sua presença",
  description:
    "Descubra novas possibilidades para o seu estilo. Conheça a essência da Miss Brand e inspire-se para o seu próximo look.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
