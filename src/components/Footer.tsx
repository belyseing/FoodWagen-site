import React from "react";
import Link from "next/link";
import Image from "next/image";

interface FooterSection {
  title: string;
  links: string[];
}

const footerSections: FooterSection[] = [
  {
    title: "Company",
    links: ["About us", "Team", "Careers", "Blog"],
  },
  {
    title: "Contact",
    links: ["Help & Support", "Partner with us", "Ride with us"],
  },
  {
    title: "Legal",
    links: [
      "Terms & Conditions",
      "Refund & Cancellation",
      "Privacy Policy",
      "Cookie Policy",
    ],
  },
];


export default function Footer() {
  return (
    <footer className="bg-[#212121] text-white">
      <div className="max-w-6xl mx-auto text-sm px-4 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-20 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3  flex-1">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h2 className=" font-bold mb-4">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="hover:text-[#FFB30E] text-[#F5F5F5]"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          
          <div className="lg:w-1/3">
            <h2 className=" font-bold text-[#BBBBBB] mb-4">FOLLOW US</h2>
            <Image
                       src="/images/media.png"
                       alt="FoodWagen Logo"
                       width={101}
                       height={24}
                     />
            <p className="text-[#BBBBBB] mb-4 pt-6">
              Receive exclusive offers in your mailbox
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-[#424242] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#FFB30E]"
              />
              <button className="bg-[#FFB800] text-white font-bold px-6 py-3 rounded-lg hover:bg-orange-400  shadow-sm shadow-orange-200 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

       
        <FooterBottom />
      </div>
    </footer>
  );
}

export function FooterBottom() {
  return (
    <div className="border-t border-gray-700 pt-4">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
       
        <div className="flex items-center gap-4">
          <div className="text-sm text-[#F5F5F5]">All rights reserved</div>
          <div className="text-white text-sm font-bold">
            © your Company, 2021
             {/* {new Date().getFullYear()} */}
          </div>
        </div>

      
      
       
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Made with 💝 by <span className="text-white font-bold">Themewagon</span></span>
          
        </div>
      </div>
    </div>
  );
}
