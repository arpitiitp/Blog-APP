import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3">
      {/* Main content row */}
      <div className="flex flex-col md:flex-row justify-between gap-10 py-10">
        {/* Left: Logo and description */}
        <div className="md:w-1/2">
          <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
          <p className="max-w-[410px] mt-3 text-gray-500/80 text-sm">
            QuickBlog is your daily dose of tech, tutorials, and trends. Stay
            updated with the latest in development, design, and digital
            innovation.
          </p>
        </div>

        {/* Right: Footer sections */}
        <div className="md:w-1/2 flex flex-wrap justify-between gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal line */}
      <hr className="border-t border-gray-200 my-4" />

      {/* Copyright */}
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        © 2025 <span className="font-medium text-gray-600">QuickBlog</span> — All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
