"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ConnectWalletButton from "./ConnectWalletButton"; // Use the correct component

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold">
        MedicalData
      </Link>

      {/* Mobile Menu Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center space-x-6">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
        <ConnectWalletButton />
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-700 p-4 flex flex-col space-y-2 lg:hidden">
          <Link href="/dashboard">Go to Dashboard</Link>
          <Link href="/about">About</Link>
          <ConnectWalletButton />
        </div>
      )}
    </nav>
   );
};

export default Navbar;
