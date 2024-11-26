import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Sqwads",
  description: "Client side landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet"/>
      </head>
      <body >
       
        <main className=" overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
