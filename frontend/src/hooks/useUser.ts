"use client"
import { currentUserFetcher } from "@/lib/authUtils";
import { useEffect, useState } from "react";

export const useCurrentUser=()=>{
 const [currentUser, setCurrentUser] = useState<{ username: string; email: string,profilePhoto:string } | null>(null);
 const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await currentUserFetcher();
        if (user) {
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getCurrentUser();
  }, []);

  return { currentUser, isLoading };
}
