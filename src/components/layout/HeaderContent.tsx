"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import foodlogo from "../../../public/Foodtuck.png";
import { getSession } from "@/lib/auth";
import { PiUserBold } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";

export default function HeaderContent() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const sessionData = await getSession();
      setSession(sessionData);
    }
    fetchSession();
  }, []);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/ourmenu" },
    { name: "Blog", path: "/blog" },
    { name: "Chef", path: "/ourchef" },
    { name: "About", path: "/aboutus" },
    { name: "Shop", path: "/shop" },
  ];

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="flex items-center">
          <Image src={foodlogo} alt="FoodTuck Logo" width={150} height={50} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(({ name, path }) => (
            <Link key={name} href={path} className="hover:text-yellow-600 transition-colors">
              {name}
            </Link>
          ))}
          {!session && (
            <Link href="/signin" className="hover:text-yellow-600 transition-colors">
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger>
              <GiHamburgerMenu className="text-yellow-600 text-[34px] cursor-pointer" />
            </SheetTrigger>
            <SheetContent>
              <ul className="flex flex-col gap-3 font-medium text-[16px] text-black">
                {navLinks.map(({ name, path }) => (
                  <Link key={name} href={path}>
                    <li className="hover:text-yellow-600">{name}</li>
                  </Link>
                ))}
                {!session && (
                  <Link href="/signin">
                    <li className="hover:text-yellow-600">Sign In</li>
                  </Link>
                )}
              </ul>
            </SheetContent>
          </Sheet>

          {/* User Icon */}
          <Link href={session ? "/profile" : "/signup"}>
            <PiUserBold className="text-white text-[24px] cursor-pointer" />
          </Link>

          {/* Shopping Cart */}
          <Link href="/shoppingcart">
            <HiOutlineShoppingBag className="text-white text-[24px] cursor-pointer" />
          </Link>
        </div>
      </div>
    </header>
  );
}