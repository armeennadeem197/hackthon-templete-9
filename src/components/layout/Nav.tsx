import Image from 'next/image';
import { IoSearch } from "react-icons/io5";
import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import foodlogo from "../../../public/Foodtuck.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from 'next/link';
import { HiOutlineShoppingBag } from 'react-icons/hi2';


const Nav = () => {
  return (
    <div className="w-full flex flex-col lg:px-[100px] px-[20px] lg:py-[20px] py-[10px]">
      <Link href={"/"} ><div className="flex justify-center lg:justify-start mb-[10px]">
        <Image src={foodlogo} alt="logo" className="justify-center mx-[440px] font-bold text-[24px] leading-[32px] lg:block hidden" />
      </div></Link>
      <div className="hidden lg:flex justify-between items-center">
        <ul className='text-white flex gap-[10px] font-medium leading-[24px] text-[15px] '>
          <Link href={"/"}><li className='w-[45px] h-[24px] font-medium leading-[24px] hover:text-yellow-600'>Home</li></Link>
          <Link href={"/ourmenu"}><li className='w-[45px] h-[24px] font-medium leading-[24px] hover:text-yellow-600'>Menu</li></Link>
          <Link href={"/blog"}><li className='w-[45px] h-[24px] font-medium leading-[24px] hover:text-yellow-600'>Blog</li></Link>
          <Link href={"/ourchef"}><li className='w-[45px] h-[24px] font-medium leading-[24px] hover:text-yellow-600'>Chef</li></Link>
          <Link href={"/aboutus"}><li className='w-[45px] h-[24px] font-medium leading-[24px] hover:text-yellow-600'>About</li> </Link>
          <Link href={"/shop"}><li className='w-[45px] h-[24px] font-medium leading-[24px] hover:text--yellow-600'>Shop</li></Link>
          <Link href={"/signin"}><li className='w-[45px] h-[24px] font-medium leading-[24px] hover:text-yellow-600'>Signin</li></Link>
        </ul>
        <div className="flex items-center gap-[15px]">
          <div className="flex items-center gap-[10px] px-[15px] py-[5px] border border-yellow-600 rounded-2xl">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-white text-[14px] placeholder:text-white w-full"
            />
            <IoSearch className="text-white w-[20px] h-[20px]" />
          </div>
          <div className='bg-white'>
          </div>
            </div>
            <Link href="/shoppingcart"><HiOutlineShoppingBag className="text-whitetext text-[24px] cursor-pointer" /></Link>

      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex justify-between px-[30px] bg-white">
        <Image src={foodlogo} alt="logo" className="w-[150px] h-auto" />
        <Sheet>
          <SheetTrigger>
            <GiHamburgerMenu className="text-yellow-600 text-[34px] cursor-pointer" />
          </SheetTrigger>
          <SheetContent>
            <ul className="flex flex-col gap-[10px] font-medium text-[16px] text-black">
              <Link href={"/"}><li className='font-medium hover:text-black'>Home</li></Link>
              <Link href={"/ourmenu"}><li className='font-medium hover:text-black'>Menu</li></Link>
              <Link href={"/blog"}><li className='font-medium hover:text-black'>Blog</li></Link>
              <Link href={"/ourchef"}><li className='font-medium hover:text-black'>Chef</li></Link>
              <Link href={"/aboutus"}><li className='font-medium hover:text-black'>About</li></Link>
              <Link href={"/shop"}><li className='font-medium hover:text-black'>Shop</li></Link>
              <Link href={"/signin"}><li className='font-medium hover:text-black'>Signin</li></Link>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Nav;
