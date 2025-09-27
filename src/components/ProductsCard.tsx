"use client"

import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useState } from "react";

type ProductsCardProps = {
    _id : string;
    name: string;
    category: string;
    price: number;
    offerPrice: number;
    image: string[];
    rating: number;
}

const ProductsCard = ({_id , name , image , category , rating , offerPrice , price} : ProductsCardProps) => {
    const [count, setCount] = useState<number>(0);
    const {addProductFromCart , removeProductFromCart, cart } = useAppContext();

    useEffect(()=>{
        if(cart[_id] !== undefined){
            setCount(cart[_id]);
        }
    } , [])

    return (
        <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white">
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={image[0]} alt={name} />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        rating > i ? (
                            <Image key={i} src={assets.star_icon} alt="star" width={12} height={12}/>
                        ) : (
                            <Image key={i} src={assets.star_dull_icon} alt="star-dull" width={12} height={12}/>
                        )
                    ))}
                    <p>(4)</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-primary">
                        ${offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">${price}</span>
                    </p>
                    <div className="text-primary">
                        {count === 0 ? (
                            <button className="flex items-center justify-center gap-1 border border-primary md:w-[80px] w-[64px] h-[34px] rounded text-primary font-medium" onClick={() => {setCount(1) ;  addProductFromCart(_id);}} >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#4FBF8B" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                                <button onClick={() => {setCount((prev) => Math.max(prev - 1, 0)); removeProductFromCart(_id)}} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{count}</span>
                                <button onClick={() => {setCount((prev) => prev + 1); addProductFromCart(_id , count)}} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsCard;