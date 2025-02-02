"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/auth";
import { PiUserBold } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export default function HeaderContent() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const sessionData = await getSession();
      setSession(sessionData);
    }
    fetchSession();
  }, []);

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="flex items-center">
          <Image src="/Foodtuck.png" alt="FoodTuck Logo" width={150} height={50} />
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-yellow-600 transition-colors">
            Home
          </Link>
          <Link href="/ourmenu" className="hover:text-yellow-600 transition-colors">
            Menu
          </Link>
          <Link href="/blog" className="hover:text-yellow-600 transition-colors">
            Blog
          </Link>
          <Link href="/ourchef" className="hover:text-yellow-600 transition-colors">
            Chef
          </Link>
          <Link href="/aboutus" className="hover:text-yellow-600 transition-colors">
            About
          </Link>
          <Link href="/shop" className="hover:text-yellow-600 transition-colors">
            Shop
          </Link>
          {session ? (
            <>
            
            </>
          ) : (
            <Link href="/signin" className="hover:text-yellow-600 transition-colors">
              Sign In
            </Link>
          )}
        </nav>
        <div className="flex gap-4 ">
          <h1><Link href={"/signup"}><PiUserBold className="text-whitetext text-[24px] cursor-pointer" /></Link></h1>
          <Link href="/shoppingcart"><HiOutlineShoppingBag className="text-whitetext text-[24px] cursor-pointer" /></Link>
            </div>
      </div>
    </header>
  );
}
