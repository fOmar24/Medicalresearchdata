"use client";

import SuiProviders from "../../utils/SuiProviders";
import Navbar from "../../components/Navbar";
import "./globals.css"; // Ensure this file exists in `src/app/globals.css`

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SuiProviders>
          <Navbar />
          {children}
        </SuiProviders>
      </body>
    </html>
  );
}
