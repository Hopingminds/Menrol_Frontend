"use client";

import { useState, useEffect } from "react";
import "./globals.css";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Menrol</title>
      </head>
      <body>
        {isLoading ? (
          <div className="loading-container">
            <Image
              src="/Comp.gif" 
              alt="Menrol Logo"
              className="loading-image"

              width={400}
              height={400}
            />
            {/* <h1 className="loading-text">WELCOME TO MENROL</h1> */}
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
