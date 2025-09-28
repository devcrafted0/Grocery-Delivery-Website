'use client'
import ProductsCard from "@/components/ProductsCard";
import { useAppContext } from "@/context/AppContext";
import { product } from "@/types";
import { useEffect, useState } from "react";

const page = () => {
  const {products} = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState<product[]>([]);

  const {searchQuery} = useAppContext();

  useEffect(()=>{
    if(searchQuery === ''){
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
    }
  }, [products , searchQuery])

  return (
    <div className="mb-32 flex flex-col px-6">
      <div className="flex flex-col items-end w-max my-10">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {filteredProducts.length > 0 ? <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(15rem,max-content))]">
        {filteredProducts.filter(product => product.inStock).map((product , index)=>(
          <ProductsCard key={index} _id={product._id} name={product.name} image={product.image} category={product.category} rating={product.rating!} offerPrice={product.offerPrice} price={product.price}/>
        ))}
      </div> : (
        <p>No Product Found...</p>
      )}

      
    </div>
  )
}

export default page;