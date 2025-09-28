'use client'

import { dummyProducts } from "@/assets/assets";
import { product } from "@/types";
import { ReactNode, useContext , createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

type AppContextTypes = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isSeller: boolean;
  setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
  showUserLogin: boolean;
  setShowUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  products : product[];
  addProductFromCart : (itemId : string , quantity? : number)=>void;
  removeProductFromCart : (itemId : string)=>void;
  cart : Cart;
  totalCartItems : number;
  searchQuery : string;
  setSearchQuery : React.Dispatch<React.SetStateAction<string>>;
}

export type User = {
  name? : string;
  email : string;
  password : string;
  state : string;
};

type Cart = {
  [key : string] : number;
}

const AppContext = createContext<AppContextTypes | undefined>(undefined);

export const AppProvider = ({children} : {children : ReactNode}) => {
    
    const [user, setUser] = useState<User | null>(null);
    const [isSeller, setIsSeller] = useState<boolean>(false);
    const [showUserLogin , setShowUserLogin] = useState<boolean>(false);
    const [products , setProducts] = useState<product[]>([]);
    const [cart , setCart] = useState<Cart>({});
    
    const [totalCartItems , setTotalCartItems] = useState<number>(0);

    // Search Query
    const [searchQuery , setSearchQuery] = useState<string>('');

    const fetchProducts = () => {
      const fetchedproducts = dummyProducts;
      setProducts(fetchedproducts);
    }

    useEffect(()=>{
      fetchProducts();
    }, []);

    // Add A Product From The Cart
    const addProductFromCart = (itemId : string , quantity? : number) => {
      if(!quantity) {
        cart[itemId] = 1;
      }
      if (quantity){
        cart[itemId] = 1 + quantity;
      }
      console.log(cart);
      setTotalCartItems(Object.values(cart).reduce((sum, num) => sum + num, 0))

      toast.success("Added To Cart ", {
        duration: 2000,
      });
    }

    // Remove A Product From The Cart
    const removeProductFromCart = (itemId : string) => {

      if(cart[itemId] === 1){
        delete cart[itemId];
      } else {
        cart[itemId] -= 1;        
      }
      
      toast.error("Removed From Cart", {
        duration: 3000,
      });
      
      console.log(cart);
      setTotalCartItems(Object.values(cart).reduce((sum, num) => sum + num, 0));
    }

    // ---------------------------------------------------

    const value : AppContextTypes = {user , setUser , isSeller , setIsSeller, showUserLogin , setShowUserLogin , products , cart , addProductFromCart , removeProductFromCart, totalCartItems, searchQuery , setSearchQuery};

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