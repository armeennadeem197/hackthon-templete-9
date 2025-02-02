
"use client";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import { PiCheckSquareOffsetBold } from "react-icons/pi";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";

export default function ShoppingCartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice } = useCartStore();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="mb-[100px]">
      <header className="bg-black text-white py-4 px-6 relative">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-500">FoodTuck</h1>
          
          {/* Desktop Navigation */}
          <nav className="lg:block hidden">
            <ul className="flex space-x-6">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/ourmenu">Menu</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/ourchef">Chef</Link></li>
              <li><Link href="/aboutus">About</Link></li>
              <li><Link href="/Newest">Shop</Link></li>
              <li><Link href="/signin">Signin</Link></li>
            </ul>
          </nav>

          {/* Mobile Navigation Button */}
          <button className="lg:hidden text-white text-2xl" onClick={() => setMobileNavOpen(!isMobileNavOpen)}>
            {isMobileNavOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileNavOpen && (
          <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col items-center py-4 space-y-4 lg:hidden z-50">
            <Link href="/" onClick={() => setMobileNavOpen(false)}>Home</Link>
            <Link href="/ourmenu" onClick={() => setMobileNavOpen(false)}>Menu</Link>
            <Link href="/blog" onClick={() => setMobileNavOpen(false)}>Blog</Link>
            <Link href="/ourchef" onClick={() => setMobileNavOpen(false)}>Chef</Link>
            <Link href="/aboutus" onClick={() => setMobileNavOpen(false)}>About</Link>
            <Link href="/Newest" onClick={() => setMobileNavOpen(false)}>Shop</Link>
            <Link href="/signin" onClick={() => setMobileNavOpen(false)}>Signin</Link>
          </div>
        )}
      </header>

      {/* Cart Section */}
      <section className="bg-cover bg-center h-64 flex items-center justify-center" style={{ backgroundImage: "url('/allnav.png')" }}>
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Shopping Cart</h2>
          <p className="pt-2">
            <Link href="/" className="text-yellow-400">Home</Link> › Cart
          </p>
        </div>
      </section>

      {/* Cart Items */}
      <div className="mt-12 px-4 md:px-[150px]">
        {cart.length === 0 ? (
          <h1 className="text-center text-xl font-semibold">Your cart is empty.</h1>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center justify-between text-gray-700 py-4 border-b">
              <div className="flex items-center gap-4 w-full md:w-2/5">
                <Image src={item.image || "/fallback-image.jpg"} alt={item.name} width={80} height={80} className="rounded-md" />
                <div>
                  <h1 className="font-semibold">{item.name}</h1>
                  <div className="flex text-yellow-500 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <IoIosStar key={i} />
                    ))}
                  </div>
                </div>
              </div>

              <h1 className="w-full md:w-1/5 text-center mt-2 md:mt-0">${item.price.toFixed(2)}</h1>
              <div className="flex gap-2">
                <button onClick={() => decreaseQuantity(item.id)} className="px-3 py-1 bg-gray-200">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)} className="px-3 py-1 bg-gray-200">+</button>
              </div>
              <h1 className="w-full md:w-1/5 text-center mt-2 md:mt-0">${(item.price * item.quantity).toFixed(2)}</h1>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
            </div>
          ))
        )}
      </div>
      {/* Checkout Section */}
      <div className="mt-12 px-4 md:px-[150px]">
        <div className="border rounded-md p-4">
          <div className="flex justify-between font-bold text-[15.5px]">
            <span>Total Amount</span>
            <span>${totalPrice().toFixed(2)}</span>
          </div>
        </div>
        <button className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600">
          <Link href="/checkout">Proceed to Checkout <PiCheckSquareOffsetBold /></Link>
        </button>
      </div>
    </div>
  );
}
