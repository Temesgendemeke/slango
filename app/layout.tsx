import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider";
import Nav from "../components/Nav";
import { Toaster } from "@/components/ui/sonner";
import AuthSync from "@/components/AuthSync";
import { PostHogProvider } from "./providers";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Slango",
    template: "%s | Slango",
  },
  description: "Your ultimate slang dictionary and language companion.",
  openGraph: {
    title: "Slango",
    description: "Your ultimate slang dictionary and language companion.",
    images: [process.env.NEXT_PUBLIC_METADATA_IMAGE],
    url: "",
  },
  twitter: {
    card: "summary_large_image",
    title: "Slango",
    description: "Your ultimate slang dictionary and language companion.",
    images: [process.env.NEXT_PUBLIC_METADATA_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PostHogProvider>
            <div className="container mx-auto min-h-[90vh] px-4 relative">
              <div className="absolute -z-30 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
              <AuthSync />
              <Nav />
              {children}
              <Toaster />
            </div>
            <Footer/>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
