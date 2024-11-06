import { Facebook, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="h-20">
      <footer className="fixed bottom-0 w-full border-t border-t-gray-200 text-white py-2 bg-primaryColor">
        <div className="container mx-auto">
          <div className=" flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Code Irhan</h2>
              <p className="text-sm">
                © 2024 LideaTech Company. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4 md:mt-0">
              <Link
                href={"#"}
                className="hover:text-gray-400">
                <Facebook />
              </Link>
              <Link
                href={"#"}
                className="hover:text-gray-400">
                <Linkedin />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
