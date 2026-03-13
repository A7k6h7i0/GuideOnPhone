import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthBootstrap } from "@/components/auth/AuthBootstrap";

export const metadata: Metadata = {
  title: "Guide on Phone",
  description: "Book verified local guides over phone while travelling."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthBootstrap />
        <Navbar />
        <main className="container-shell flex-1 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
