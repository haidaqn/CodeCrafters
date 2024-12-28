'use client'

import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import Toaster from "@/components/ui/sonner.tsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AlertDialogProvider, ThemeProvider} from "@/components";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const queryClient = new QueryClient();

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8"/>
      <link rel="icon" type="image/svg+xml" href="/logo-removebg-preview.png"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Code Crafters</title>
    </head>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="next-ui-theme">
        <TooltipProvider disableHoverableContent>
          <AlertDialogProvider>
            {children}
            <Toaster closeButton richColors toastOptions={{
              classNames: {
                error: 'bg-red-400',
                success: 'bg-green-400',
                warning: 'bg-yellow-400',
                info: 'bg-blue-400',
              },
            }}/>
          </AlertDialogProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
    </body>
    </html>
  );
}
