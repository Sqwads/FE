
import type { Metadata } from "next";
import { MantineProvider } from "@mantine/core";
import CustomQueryClientProvider from "./providers/react-query-provider";
import { Toaster } from "react-hot-toast";
import { DatesProvider } from "@mantine/dates";
import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import "./globals.css";


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
       
        <CustomQueryClientProvider> 
          <MantineProvider>
          <DatesProvider settings={{locale: 'ru',}}>
          <main className=" overflow-hidden">
            {children}
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerClassName="text-sm"
              toastOptions={{
                duration: 2500,
              }}
            />
          </main>
          </DatesProvider>
          </MantineProvider>
        </CustomQueryClientProvider>
      </body>
    </html>
  );
}
