"use client";

import { useState, useEffect } from "react";
import "./globals.css";

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
            <img
              src="/firstscreen-unscreen.gif" // Ensure this GIF is in the public folder
              alt="Menrol Logo"
              className="loading-image"
            />
            <h1 className="loading-text">WELCOME TO MENROL</h1>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
