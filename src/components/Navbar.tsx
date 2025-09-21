'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { assets } from '../assets/assets.js'
import {useAppContext} from '../context/AppContext.tsx'
import NavLink from './NavLink.tsx'
import { redirect } from "next/navigation"

const Navbar = () => {
    const [open, setOpen] = useState<boolean>(false)
    const {user , setUser , setShowUserLogin} = useAppContext();

    const logout = () => {
        setUser(null);
        redirect('/');
    }

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <Link onClick={()=>setOpen(false)} href="/">
                <Image src={assets.logo} alt="logo" width={150} height={150} />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/all-products">All Products</NavLink>
                <Link href="/">Contact</Link>
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <Image src={assets.search_icon} alt="search" width={20} height={20}/>
                </div>

                <div className="relative cursor-pointer">
                    <Image src={assets.cart_icon} alt="cart" width={20} height={20}/>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">3</button>
                </div>

                {!user ? <button onClick={()=>setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull text-white rounded-full">
                    Login
                </button> : <div className="relative group">
                    <Image src={assets.profile_icon} alt="profile-icon" width={40} height={40}/>
                    <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
                        <li className="p-1 pl-3 hover:bg-primary/10 cursor-pointer"><Link href='/my-orders'>My Orders</Link></li>
                        <li className="p-1 pl-3 hover:bg-primary/10 cursor-pointer" onClick={logout}>Logout</li>
                    </ul>
                </div>}
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <Image src={assets.menu_icon} alt="menu-icon" width={20} height={20}/>
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink onClick={()=>setOpen(false)} href="/" className="block">Home</NavLink>
                <NavLink onClick={()=>setOpen(false)} href="/all-products" className="block">All Products</NavLink>
                <Link onClick={()=>setOpen(false)} href="/" className="block">Contact</Link>
                {user && <NavLink onClick={()=>setOpen(false)} href='/orders'>
                    My Orders
                </NavLink>}

                { !user ? (
                <button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull text-white rounded-full text-sm">
                    Login
                </button>
                ) : (
                    <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull text-white rounded-full text-sm">
                    Log Out
                    </button>
                )}
            </div>

        </nav>
  )
}

export default Navbar