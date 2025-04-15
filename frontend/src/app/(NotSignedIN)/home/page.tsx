"use client"
import { redirect } from "next/navigation";
import Features from "../_Components/Features";
import Hero from "../_Components/Hero";
import { useCurrentUser } from "@/hooks/useUser";

export default function Home(){
  const {currentUser,isLoading}=  useCurrentUser();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if(currentUser){
    redirect('/dashboard');
  }
 return (
  <>
  <Hero></Hero>
  <Features></Features>
  </>
 )
}
