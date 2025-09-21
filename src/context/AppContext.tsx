'use client'

import { ReactNode, useContext , createContext, useState } from "react";

type AppContextTypes = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isSeller: boolean;
  setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
  showUserLogin: boolean;
  setShowUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

type User = {
  id: string;
  name: string;
  email: string;
};

const AppContext = createContext<AppContextTypes | undefined>(undefined);

export const AppProvider = ({children} : {children : ReactNode}) => {
    
    const [user, setUser] = useState<User | null>(null);
    const [isSeller, setIsSeller] = useState<boolean>(false);
    const [showUserLogin , setShowUserLogin] = useState<boolean>(false);

    const value : AppContextTypes = {user , setUser , isSeller , setIsSeller, showUserLogin , setShowUserLogin};

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider >
}

export const useAppContext = (): AppContextTypes => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};