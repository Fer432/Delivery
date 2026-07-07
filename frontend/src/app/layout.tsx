import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FlashBite — Tu comida favorita, al instante",
  description:
    "FlashBite es la app de delivery más rápida. Pide comida de los mejores restaurantes y recíbela en minutos. Descubre ofertas exclusivas y una experiencia de entrega premium.",
  keywords: ["delivery", "comida", "restaurantes", "pedidos", "entrega rápida"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
