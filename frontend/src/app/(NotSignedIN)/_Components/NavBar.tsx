"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import useScroll from '@/hooks/useScroll';

const Navbar = () => {
  const isScrolled = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        isScrolled ? 'bg-black/70 backdrop-blur-md shadow-sm' : 'bg-black/30 backdrop-blur-lg'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-cyan-500 rounded-md flex items-center justify-center">
                <span className="text-white font-mono font-bold">M</span>
              </div>
              <span className="font-bold text-xl text-white">MarcelPearl</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="nav-link text-white hover:text-cyan-200 transition-colors">Home</Link>
            <Link href="#pricing" className="nav-link text-white hover:text-cyan-200 transition-colors">Features</Link>
            <Link href="#faq" className="nav-link text-white hover:text-cyan-200 transition-colors">FAQ</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button className="bg-cyan-500 hover:bg-teal-600 transition-colors text-white" onClick={() => (window.location.href = '/auth')}>
              Sign Up/ Login
            </Button>
          </div>

          <button 
            className="md:hidden text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black/70 backdrop-blur-md shadow-lg p-4 border-t border-cyan-500 animate-fade-in">
          <nav className="flex flex-col space-y-4 px-2">
            <Link 
              href="#hero" 
              className="py-2 px-4 text-white hover:bg-cyan-200 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="#features" 
              className="py-2 px-4 text-white hover:bg-cyan-200 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#faq" 
              className="py-2 px-4 text-white hover:bg-cyan-200 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="pt-2 pb-4 flex flex-col space-y-3">
              <Link href="/login" className="py-2 px-4 text-center text-white hover:bg-cyan-200 rounded-md transition-colors">
                Log in
              </Link>
              <Button className="bg-cyan-500 hover:bg-teal-600 w-full">
                Sign up free
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
