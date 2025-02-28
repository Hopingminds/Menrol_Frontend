"use client";

import React from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Menrol</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
