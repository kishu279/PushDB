"use client";

import Image from "next/image";
import logoImage from "@/assets/Images/logo.svg";
import { AlignJustify, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-4 z-10 inset-0 fixed h-fit">
      <div className="container mx-auto px-4 max-w-6xl ">
        <div className="grid grid-cols-2 items-center px-4 border border-white/15 rounded-full bg-neutral-900/60 backdrop-blur-md ">
          <div>
            <Image
              src={logoImage}
              alt="logo"
              priority={true}
              className="h-16 w-auto rounded-full"
            />
          </div>
          <div className="flex justify-end gap-3 items-center ">
            {/* Mobile toggle button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/20 transition"
            >
              <AlignJustify className="w-6 h-6 text-white" />
            </button>

            {/* Desktop buttons */}
            <Button />
          </div>
        </div>
      </div>

      {/* Sidebar (Mobile) */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 z-40"
          />

          {/* Sidebar */}
          <div className="fixed inset-0 w-64 h-full bg-neutral-900 z-50 p-6 shadow-lg transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="text-white w-6 h-6" />
              </button>
            </div>
            <ul className="space-y-4 text-white font-semibold">
              <li>features</li>
              <li>Sign In</li>
              <li>Sign Up</li>
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
