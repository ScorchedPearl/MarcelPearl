"use client";
import React, { useEffect } from 'react';
import Navbar from './_Components/NavBar';
import ThreeJsBackground from './_Components/ThreeBack';
import Footer from './_Components/Footer';
import { PearlRabbit } from '../_components/PearlRabbit';
import Bot from '../_components/Bot';

export default function Layout({ children }: { children: React.ReactNode }) {

 return (
  <div>
   <ThreeJsBackground />
   <header>
    <Navbar />
   </header>
   <main>{children}</main>
    <Bot />
    <Footer />
  </div>
 );
}