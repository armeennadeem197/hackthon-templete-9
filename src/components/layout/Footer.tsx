import React from "react";
import Image from "next/image";
import footer1 from "../../../public/footer1.png";
import footer2 from "../../../public/footer2.png";
import footer3 from "../../../public/footer3.png";
import { PiClockClockwiseBold } from "react-icons/pi";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 lg:px-[135px] py-6 md:py-[50px]">
        <div className="md:w-[50%] w-full text-center md:text-left">
          <h2 className="text-lg md:text-2xl font-semibold">
            <span className="text-[#FF9F0D]">St</span>ill Need Our Support
          </h2>
          <p className="text-sm md:text-base font-normal mt-4">
            Don&#39;t wait, make a smart & logical quote here. It&#39;s pretty easy.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center md:mt-0 mt-4">
          <input
            type="text"
            placeholder="Enter Your Email"
            className="bg-[#FF9F0D] text-white py-2 px-4 rounded-md w-full sm:w-auto"
          />
          <button className="text-[#FF9F0D] bg-white py-2 px-4 rounded-md mt-2 sm:mt-0 sm:ml-2">
            Subscribe Now
          </button>
        </div>
      </div>

      <hr className="border-[#FF9F0D] mx-4 sm:mx-8 lg:mx-[135px] my-4" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-8 lg:px-[135px] py-6">
        <div>
          <h2 className="text-xl font-semibold uppercase">About Us</h2>
          <p className="text-gray-400 mt-4 text-sm">
            Corporate clients and leisure travelers rely on Groundlink for dependable, safe, and professional car service worldwide.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="bg-[#FF9F0D] w-16 h-16 flex items-center justify-center">
              <PiClockClockwiseBold className="text-white text-3xl" />
            </div>
            <div>
              <p className="text-white text-sm">Opening Hours</p>
              <p className="text-xs">Mon - Sat (8.00 - 6.00)</p>
              <p className="text-xs">Sunday - Closed</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold uppercase">Useful Links</h2>
          <ul className="text-gray-400 mt-4 text-sm space-y-2">
            {['About', 'News', 'Partner', 'Team', 'Menu', 'Contact'].map((link, index) => (
              <li key={index} className="hover:underline cursor-pointer">{link}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold uppercase">Help?</h2>
          <ul className="text-gray-400 mt-4 text-sm space-y-2">
            {['FAQ', 'Terms & Conditions', 'Reporting', 'Documentation', 'Support Policy', 'Privacy'].map((link, index) => (
              <li key={index} className="hover:underline cursor-pointer">{link}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold uppercase">Recent Posts</h2>
          {[footer1, footer2, footer3].map((img, index) => (
            <div key={index} className="flex items-center gap-4 mt-4">
              <Image src={img} alt="Post Image" width={50} height={50} />
              <div>
                <p className="text-xs text-gray-400">20 Feb 2022</p>
                <p className="text-sm">Keep Your Business</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-6 bg-[#FF9F0D] flex flex-col sm:flex-row justify-between items-center">
        <span className="text-sm text-black">© 2023 Flowbite™. All Rights Reserved.</span>
        <div className="flex gap-3 mt-3 sm:mt-0">
          {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterest].map((Icon, index) => (
            <div key={index} className="bg-white p-2 rounded-full flex items-center justify-center w-10 h-10">
              <Icon className="text-black text-lg" />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;