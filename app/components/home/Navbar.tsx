"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flexBetween px-6 py-4 rounded-lg relative z-30 mb-7 shadow-md">
      {/* Logo */}
      <Link href="/">
        <Image src="/images/sqwads-logo.png" alt="logo" width={200} height={50} />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden h-full gap-12 lg:flex items-center">
        {NAV_LINKS.map((link) => (
          <li key={link.key} className="flex items-center">
            <Link
              href={link.href}
              className="regular-16 text-[#D5D7DA] flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
            >
              {link.label}
            </Link>
            {/* Add "Coming Soon" button next to "Business" */}
            {link.key === 'business' && (
              <div className="ml-2">
                <Image
                  src="/images/coming.png"
                  alt="coming_soon"
                  width={80} // Adjust width as needed
                  height={30} // Adjust height as needed
                />
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Get Started Button (Desktop) */}
      <div className="hidden lg:flex items-center">
        <Link href={"/signup"}>
          <Button type="button" title="Get Started For Free" icon="/arrow.svg" variant="#0234B8" />
        </Link>
      </div>

      {/* Hamburger Menu (Mobile) */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none flex items-center justify-center"
        >
          {isMenuOpen ? (
            <AiOutlineClose className="w-6 h-6" /> // Close Icon
          ) : (
            <AiOutlineMenu className="w-6 h-6" /> // Hamburger Menu Icon
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-950 rounded-lg shadow-md">
          <ul className="flex flex-col items-center gap-4 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.key} className="flex items-center">
                <Link
                  href={link.href}
                  className="regular-16 text-blue-50 cursor-pointer pb-1.5 transition-all hover:font-bold"
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {link.label}
                </Link>
                {/* Add "Coming Soon" button next to "Business" in mobile view */}
                {link.key === 'business' && (
                  <div className="ml-2">
                    <Image
                      src="/images/coming.png"
                      alt="coming_soon"
                      width={80} // Adjust width as needed
                      height={30} // Adjust height as needed
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Get Started Button (Mobile) */}
          <div className="flex items-center justify-center mt-4">
            <Link href={"/signup"}>
              <Button type="button" title="Get Started" icon="/arrow.svg" variant="#0234B8" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;