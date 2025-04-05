import React from 'react';
import Navbar from './_components/navbar';
import Bot from '../_components/Bot';

export default function Layout({ children }: { children: React.ReactNode }) {
 return (
  <div>
   <Navbar></Navbar>
   <main>{children}</main>
    <Bot></Bot>
   {/* <Footer></Footer> */}
  </div>
 );
}