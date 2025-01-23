"use client";

import React, { useState } from "react";
import Image from "next/image";

const NavbarPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      className="flex m-auto justify-between w-full h-16 px-6 shadow-sm text-3xl"
    >
      <div className="flex flex-row p-2">
        <div className="basis-1/4">
          <Image
            src="http://res.cloudinary.com/dzzwaenuc/image/upload/v1736301479/yjqn2z0x59g193tgyzqp.png"
            alt="..."
            width={60}
            height={60}
          />
        </div>
        <div className="basis-1/4">
          <div className="text-white hover:text-blue-300">
            <div className="flex">
              <div className="flex-none w-14"></div>
              <div className="text-xl tracking-wider flex w-28 bg-black flex-row-reverse">
                SCHOOL
              </div>
            </div>

            {/* <div className="flex flex-1 bg-white"></div>
            <div className="bg-black flex flex-1 flex-row-reverse">              
            SCHOOL
            </div> */}
          </div>
          <div className="text-bold">NONGBERD</div>
        </div>
        {/* <div className="basis-1/2">03</div> */}
      </div>

      {/* Right Section */}
      <div className="hidden md:flex flex-1 justify-end items-center space-x-6 my-8 p-3">
        {/* Home Link */}
        <a
          href="/"
          className="text-xl font-medium text-blue-600 hover:text-black px-4 py-2 transition duration-300"
        >
          หน้าหลัก
        </a>

        {/* Dropdown Button */}
        <div className="relative">
          <button
            className="flex items-center gap-2 px-4 py-2 text-xl font-medium text-blue-800 hover:text-black cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            ข้อมูลโรงเรียน
            <svg
              className={`w-5 h-5 transform transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
              <a
                href="#"
                className="text-xl block px-4 py-2 text-blue-700 hover:bg-gray-100 hover:text-gray-900"
              >
                ตราสัญลักษณ์
              </a>
              <a
                href="#"
                className="text-xl block px-4 py-2 text-blue-700 hover:bg-gray-100 hover:text-gray-900"
              >
                คำขวัญ
              </a>
              <a
                href="#"
                className="text-xl block px-4 py-2 text-blue-700 hover:bg-gray-100 hover:text-gray-900"
              >
                วิสัยทัศน์
              </a>
            </div>
          )}
        </div>

        {/* Contact Link */}
        <a
          href="/personal2"
          className="text-xl font-medium text-blue-800 hover:text-black px-4 py-2 transition duration-300"
        >
          บุคลากร
        </a>
        {/* Contact Link */}
        {/* <a
          href="/contact"
          className="text-xl font-medium text-blue-800 hover:text-black px-4 py-2 transition duration-300"
        >
          ติดต่อเรา
        </a> */}

        <a
          href="/about"
          className="text-xl font-medium text-blue-800 hover:text-black px-4 py-2 transition duration-300"
        >
          เกี่ยวกับเรา
        </a>
      </div>
    </div>
  );
};

export default NavbarPage;
