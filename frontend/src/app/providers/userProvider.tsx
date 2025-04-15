import { createContext,useContext,useState } from "react";
import { useCurrentUser } from "@/hooks/useUser";

export interface User{
  username: string;
  email: string;
  profilePhoto: string;
}

interface UserContextType {
  currentUser: User | null;
  isLoading: boolean;
}
const UserContext = createContext<UserContextType>({
  currentUser: null,
  isLoading: true,
});
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, isLoading } = useCurrentUser();
  return (
    <UserContext.Provider value={{ currentUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);