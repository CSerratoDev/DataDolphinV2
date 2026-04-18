'use client'; // El Layout principal ahora necesita ser Client Component para leer la ruta

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-white`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <main className="">
          {!isDashboard && <Header />}
          
          <section className={!isDashboard ? "py-0" : ""}>
            {children}
          </section>

          {!isDashboard && <Footer />}
        </main>
      </body>
    </html>
  );
}