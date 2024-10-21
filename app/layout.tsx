'use client';
import localFont from "next/font/local";
import "./globals.css";

import store from "@/redux/store";
import { Provider as StoreProvider } from "react-redux";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import CitySearch from "@/components/search";
import NewsSection from "@/components/newsSection";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider store={store}>
          <div className="grid grid-cols-1 md:grid-cols-12 md:h-screen overflow-hidden gap-2 bg-[#080416]">
            <div className="md:col-span-7 h-auto md:h-full border border-black p-3">
              <BackgroundBeamsWithCollision>
                <CitySearch onSelect={(lat, lon) => console.log(lat, lon)} />
                <div>{children}</div>
              </BackgroundBeamsWithCollision>
            </div>
            <div className="md:col-span-5 md:h-full h-auto text-white text-center py-3">
              <h1 className="text-xl py-3">Checkout the latest weather news</h1>
              <div className="">
                <NewsSection />
              </div>
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
