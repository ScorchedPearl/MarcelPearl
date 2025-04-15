"use client"
import React from 'react';
import Navbar from './_components/navbar';
import Bot from '../_components/Bot';
import { useCurrentUser } from '@/hooks/useUser';
import { UserProvider } from '../providers/userProvider';

export default function Layout({ children}: { children: React.ReactNode }) {
 const {currentUser,isLoading}=  useCurrentUser();
 if (isLoading) {
  return <div>Loading...</div>;
 }
 return (
  <div>
   <UserProvider>
   <Navbar ></Navbar>
   <main>{children}</main>
   </UserProvider>
    <Bot></Bot>
   {/* <Footer></Footer> */}
  </div>
 );
}
