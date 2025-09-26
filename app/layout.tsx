import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // adjust as needed
  variable: "--font-dm-sans",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // adjust as needed
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Weather Now",
  description: "Crafted by zamanShahed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${bricolage.variable} antialiased`}>
        <div
          style={{ fontFamily: "var(--font-dm-sans)" }}
          className="bg-gradient-to-br from-[#1E1B4B] via-[#581C87] to-[#1E1B4B] min-h-screen p-5"
        >
          {children}
        </div>
      </body>
    </html>
  );
}
