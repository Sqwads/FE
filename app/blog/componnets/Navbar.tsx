"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/Button";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

// Add a `textColor` prop here. Default to 'text-gray-900' if not provided.
const BlogNav = ({ textColor = 'text-gray-900' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flexBetween px-6 py-4 rounded-lg relative z-30 ">
      {/* Logo */}
      <Link href="/">
        <img src="/images/sqwads-logo.png" alt="logo" className="h-10 lg:h-12 lg:w-42 w-45 object-cover " />
      </Link>

      {/* Desktop Navigation */}
      <ul className="h-full gap-12 hidden lg:flex items-center">
        
        {NAV_LINKS.map((link) => (
          <li key={link.key} className="flex items-center">
            <Link
              href={link?.href}
              // Apply the textColor prop here
              className={`regular-16 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold ${textColor}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Get Started Button (Desktop) */}
      <div className="hidden lg:flex items-center">
        <Link href={"/signup"}>
          <Button type="button" title="Get Started for free" icon="/arrow.svg" variant="#0234B8" />
        </Link>
      </div>

      {/* Hamburger Menu (Mobile) */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="focus:outline-none flex items-center justify-center"
        >
          {isMenuOpen ? (
            <AiOutlineClose color="#0234B8" className="w-6 h-6" /> 
          ) : (
            // Use the textColor for the hamburger icon when the menu is closed
            <AiOutlineMenu className={`w-6 h-6 ${textColor}`} /> 
          )}
        </button>
      </div>

      {/* Mobile Navigation (This part already has white text, which is fine) */}
      {isMenuOpen && (
        <div className="absolute top-16 py-5 left-0 w-full bg-blue-950 rounded-lg shadow-md">
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

export default BlogNav;
