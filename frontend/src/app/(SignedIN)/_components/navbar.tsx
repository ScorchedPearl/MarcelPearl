"use client"
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import UserAvatar from "@/components/ui/userAvatar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  User,
  CreditCard,
  Users,
  BadgeCheck,
  BookOpen,
  Home,
  Info,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";
export default function Navbar() {
  const navItems = [
    { icon: Home, label: "Home" },
    { icon: BookOpen, label: "Problems" },
    { icon: MessageSquare, label: "Forums" },
    { icon: Info, label: "About Us" },
  ];
  
  const userMenuItems = [
    { icon: User, label: "Profile" },
    { icon: Settings, label: "Edit Profile" },
    { icon: Users, label: "Dashboard" },
    { icon: BadgeCheck, label: "ContactUS" },
    { icon: LogOut, label: "Log Out", className: "text-red-500 hover:text-red-600" },
  ];
  const [activeTab, setActiveTab] = useState("Home");
  return (
    <div className="fixed top-0 left-0 bg-gradient-to-tl from-zinc-800 via-gray-950-950 to-black-900 w-full h-16 shadow-lg flex justify-between items-center px-6 z-50">
      <div className="flex items-center space-x-2">
      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
            <span className="text-white font-bold">M</span>
      </div>
      <div className="text-white font-semibold text-lg">MarcelPearl</div>
      </div>
      <div className="border border-cyan-100/50 m-3 rounded-xl h-12 w-[520px] flex justify-center items-center backdrop-blur-sm bg-white/5 shadow-inner shadow-emerald-700/20">
        <div className="relative w-[99.5%] h-[95%] flex items-center border rounded-lg border-cyan-100/50">
          <div
            className="absolute top-0 left-0 bg-gradient-to-r from-cyan-800 to-cyan-900 rounded-lg transition-all duration-300 h-10/12 flex items-center px-3 mt-1"
            style={{
              width: `${100 / navItems.length}%`,
              transform: `translateX(${navItems.findIndex(
                (item) => item.label === activeTab
              ) * (395 / navItems.length)}%)`,
            }}
          />
          <div className="flex w-full justify-evenly">
            {navItems.map(({ icon: Icon, label }) => (
              <Button
                key={label}
                variant="ghost"
                className={cn(
                  "relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200",
                  activeTab === label ? "text-white font-bold" : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
                onClick={() => setActiveTab(label)}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="text-white font-medium border-transparent ">
        <DropdownMenu>
          <DropdownMenuTrigger className="border-0 border-transparent focus:outline-none focus:ring-0">
            <UserAvatar name={"Saumya"} className="px-5 py-2" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="gap-2 h-auto bg-gradient-to-r from-teal-950 flex flex-col px-4 my-3 pb-5 border-b-teal-400 border-l-teal-400 border rounded-2xl ">
            <DropdownMenuSeparator />
            
            <div className="flex flex-col border justify-start items-start border-cyan-100/50 rounded-lg w-[200px]">
            {userMenuItems.map(({ icon: Icon, label, className }) => (
              
              <DropdownMenuItem
                key={label}
                className={cn(
                  "px-4 py-2.5 cursor-pointer",
                  "text-white/80 hover:text-white hover:bg-white/10",
                  "flex items-center gap-2 text-sm font-medium",
                  "focus:bg-white/10 w-[200px] rounded-lg",
                  className
                )}
              >

                <Icon className="w-4 h-4 text-white" />
                {label}
              </DropdownMenuItem>
              
            ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

