"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Book, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div>
      <div className="lg:hidden flex items-center p-4">
        <button
          onClick={toggleMenu}
          className="text-white p-2 rounded-md focus:outline-none"
          aria-label="Abrir Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center space-y-8 text-white">
          <Link
            href="/home"
            passHref
            className={`text-xl font-semibold font-montserrat ${
              isActive("/home") ? "text-amber-500" : "hover:text-gray-300"
            }`}
            onClick={toggleMenu}
          >
            Inicial
          </Link>
          <Link
            href="/books"
            passHref
            className={`text-xl font-semibold font-montserrat ${
              isActive("/books") ? "text-amber-500" : "hover:text-gray-300"
            }`}
            onClick={toggleMenu}
          >
            Livros
          </Link>
        </div>
      )}
      <div className="hidden lg:flex text-zinc-800 h-screen w-24 flex-col items-center">
        <ul className="flex flex-col justify-center h-full items-center space-y-4">
          <li>
            <Link href="/home" passHref>
              <button
                className={`p-2 flex items-center justify-center w-full rounded-full ${
                  isActive("/home")
                    ? "bg-amber-500 text-white"
                    : "hover:bg-zinc-900"
                }`}
              >
                <Home size={20} />
              </button>
            </Link>
          </li>
          <li>
            <Link href="/books" passHref>
              <button
                className={`p-2 flex items-center justify-center w-full rounded-full ${
                  isActive("/books")
                    ? "bg-amber-500 text-white"
                    : "hover:bg-zinc-900"
                }`}
              >
                <Book size={20} />
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
