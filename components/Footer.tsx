"use client";

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[rgba(155,183,255,0.15)] py-12 px-6 md:px-12 lg:px-20">
      {/* Logo Section */}
      <div className="flex justify-start items-center">
        <Image
          src="/images/footer-logo.svg"
          alt="Sqwads Logo"
          width={200}
          height={50}
        />
      </div>

      {/* Divider */}
      <div className="mt-6 border-t border-gray-200"></div>

      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {/* Column 1: Links */}
        <div>
          <h3 className="font-medium text-gray-900">Links</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#about" className="text-gray-600 hover:text-gray-900">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#faq" className="text-gray-600 hover:text-gray-900">
                FAQ's
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2: Company */}
        <div>
          <h3 className="font-medium text-gray-900">Company</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#privacy" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#terms" className="text-gray-600 hover:text-gray-900">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#cookies" className="text-gray-600 hover:text-gray-900">
                Cookies Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Newsletter */}
        <div>
          <h3 className="font-medium text-gray-900">Sign up for our newsletter</h3>
          <p className="mt-4 text-gray-600">
            Stay updated with the latest projects and opportunities on Sqwads.
          </p>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-[70%] border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="mt-4 w-[40%] bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between">
        {/* Left: Copyright */}
        <p className="text-gray-600 text-center md:text-left">
          Copyright &copy; 2024 Sqwads | All Rights Reserved
        </p>

        {/* Right: Social Media */}
<div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0 md:pl-20">
  <p className="text-gray-600">Our Socials:</p>
  <div className="flex space-x-4">
    <a
      href="#twitter"
      className="text-gray-600 hover:text-blue-500"
      aria-label="Twitter"
    >
      <Image
        src="/images/twitter.png"
        alt="Twitter Logo"
        width={24}
        height={24}
      />
    </a>
    <a
      href="#instagram"
      className="text-gray-600 hover:text-pink-500"
      aria-label="Instagram"
    >
      <Image
        src="/images/instagram.png"
        alt="Instagram Logo"
        width={24}
        height={24}
      />
    </a>
    <a
      href="#linkedin"
      className="text-gray-600 hover:text-blue-600"
      aria-label="LinkedIn"
    >
      <Image
        src="/images/linkedIn.png"
        alt="LinkedIn Logo"
        width={24}
        height={24}
      />
    </a>
  </div>
</div>

      </div>
    </footer>
  );
};

export default Footer;
