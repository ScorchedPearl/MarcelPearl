import React from 'react';
import Navbar from './_Components/NavBar';
import ThreeJsBackground from './_Components/ThreeBack';
import Footer from './_Components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
 return (
  <div>
   <ThreeJsBackground />
   <header>
    <Navbar />
   </header>
   <main>{children}</main>
    <Footer />
  </div>
 );
}