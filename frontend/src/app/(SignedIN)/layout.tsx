import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
 return (
  <div>
   {/* <Navbar></Navbar> */}
   <main>{children}</main>
   {/* <Footer></Footer> */}
  </div>
 );
}